import {Action} from '@ngrx/store';

export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const SIGNIN = 'SIGNIN';
export const TRY_SIGN_IN = 'TRY_SIGN_IN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {
  readonly type = TRY_SIGN_UP;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class TrySignin implements Action {
  readonly type = TRY_SIGN_IN;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {
  }
}

export type AuthActions = Signin | Signup | LogOut | SetToken | TrySignup | TrySignin;
