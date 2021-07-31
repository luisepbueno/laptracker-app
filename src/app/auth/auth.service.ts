import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, take, mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { environment } from '../../environments/environment';
import { User, UserData } from './user.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLogged = false;

  public user: User;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {}

  login(email: string, password: string) {
    let token : string;
    return this.http.post<UserData>(
      `${environment.restApiUrl}/auth`,
      {email: email, password: password}
    ).pipe(
      take(1),
      switchMap( (loggedUser) => {
        token = loggedUser.token;
        this.user = new User(
          loggedUser.id,
          loggedUser.email
        );
        // save user info to storage
        return this.saveUserInfo();
      }),
      switchMap( () => {
        // save token to storage
        return this.saveToken(token);
      }),
      switchMap( () => {
        this._isLogged = true;
        return of({
          id: this.user.id,
          email: this.user.email
        });
      })
    )
  }

  logout() {
    this.user = null;
    this._isLogged = false;
    return this.storage.remove('token')
      .then( () => {
        this.router.navigateByUrl(`/auth`);
      });
  }

  signUp(email: string, password: string) {
    return this.http.post<UserData>(
      `${environment.restApiUrl}/auth/signup`,
      {email: email, password: password, id: null})
      .pipe(
        take(1)
      )
  }

  saveToken(token: string) {
    return this.storage.set('token', token);
  }

  getToken() {
    return this.storage.get('token');
  }

  saveUserInfo() {
    return this.storage.set('user-id', this.user.id)
        .then(() => {
            return this.storage.set('email', this.user.email);
        })
        .then(() => {
            return true;
        })
        .catch((err) => {
          console.log(err);
          this.logout().then(() => {});
        })
  }

  recoverAuthInfo() {
    let userId: number;
    let email: string;
    return this.storage.get('user-id')
      .then((_userId: number) => {
        userId = _userId;
        return this.storage.get('email');
      })
      .then((_email: string) => {
        email = _email;
        this.user = new User(
          userId,
          email
        )
        return this.getToken();
      })
      .then((_token: string) => {
        if(userId && email && _token) {
          this._isLogged = true;
          return true;
        }
        this.user = null;
        return false;
      })
      .catch((err) => {
        this.user = null;
        return false;
      });
  }

  get isLogged() {
    return this._isLogged;
  }

  validateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email))
      return true
    else
      return false;
  }
}
