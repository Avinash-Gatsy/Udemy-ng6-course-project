import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map, switchMap, mergeMap, tap} from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import {from} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .ofType(AuthActions.TRY_SIGN_UP)
    .pipe(map((action: AuthActions.TrySignup) => {
      return action.payload;
    }), switchMap((authData: { username: string, password: string }) => {
      // from will return an observable from a promise
      return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }), switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }), mergeMap((token: string) => {
      // combines observables into a single observable
      return [
        {
          type: AuthActions.SIGNUP
        }, {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    }));

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGN_IN)
    .pipe(map((action: AuthActions.TrySignin) => {
      return action.payload;
    }), switchMap((authData: { username: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }), switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }), mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        }, {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    }));
  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .pipe(tap(() => {
      this.router.navigate(['/']);
    }));

  constructor(private actions$: Actions, private router: Router) {
  }
}
