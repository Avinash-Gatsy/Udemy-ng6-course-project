import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app/store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        this.store.dispatch(new AuthActions.Signup());
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
          );
      })
      .catch(
        err => console.log(err)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.store.dispatch(new AuthActions.Signin());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
            );
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.LogOut());
  }
}
