import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        err => console.log(err)
      );
  }
  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => localStorage.setItem('token', token)
            );
        }
      )
      .catch(
        err => console.log(err)
      );
  }
  getToken() {
    // will return a promise
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => localStorage.setItem('token', token)
      );
    return localStorage.getItem('token');
  }
  isAuthenticated() {
    return localStorage.getItem('token') !== '';
  }
  logout() {
    firebase.auth().signOut();
    localStorage.setItem('token', '');
  }
}
