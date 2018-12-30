import { Injectable, NgModule, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from "moment";
import { User } from './user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  apiRoot: string = "http://localhost:8080";
  authenticated = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  hasNotification = new BehaviorSubject<boolean>(false);
  user: User;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
  }

  authenticate(): void {
    if (!this.authenticated.getValue()) {
      this.http.get<User>(`${this.apiRoot}/api/getPrincipal`).toPromise().then(response => {
        this.authenticated.next(true);
        this.user = response;
        if (this.user.admin) {
          this.isAdmin.next(this.user.admin);
        }
        if (this.user.hasNotification !== false) {
          this.hasNotification.next(true);
        }
      })
        .catch(data => localStorage.removeItem('id_token'));
    }
  }

  getUser(): Promise<User> {
    return this.http.get<User>(`${this.apiRoot}/api/getPrincipal`).toPromise();
  };

  seeNotification(): Promise<boolean> {
    return this.http.post<boolean>(`${this.apiRoot}/api/user/seeNotification`, null).toPromise();
  };

  notificationSeen(): void {
    this.hasNotification.next(false);
  }

  getJwtToken(username: string, password: string): Observable<string> {
    let apiUrl = `${this.apiRoot}/login`;
    const options = { responseType: 'text' as 'json' };
    return this.http.post<string>(apiUrl, { username, password }, options);
  }

  private setSession(authResult) {
    localStorage.setItem('id_token', authResult);
  }

  logout() {
    localStorage.removeItem("id_token");
    this.authenticated.next(false);
    this.isAdmin.next(false);
  }

  public userIsAdmin(): boolean {
    if (this.authenticated.getValue() == true && this.isAdmin.getValue() == true) {
      return true;
    }
    return false;
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("id_token");
    if (token != null) {
      this.authenticate();
      return true;
    }
    return false;
  }

  saveUserDetails(username, password, email, firstName, lastName, phone): Observable<boolean> {
    let apiUrl = `${this.apiRoot}/register`;
    return this.http.post<boolean>(apiUrl, { username, password, email, firstName, lastName, phone });
  }
}
