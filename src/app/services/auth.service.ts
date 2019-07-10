import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_HOST_PORT } from '../config/server';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Credentials, UserInterface } from '../utils/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient) {}

  login(credentials: Credentials) {
    // console.log('CREDENTIALS: ', credentials);
    return this.http.post(API_HOST_PORT + '/login', credentials)
      .pipe(map((result: { token: string }) => {
        if ( result && result.token ) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      }));
  }

  logout() {
    // console.log("This is Logout");
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  get isLoggedIn() {

    // return true;

    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if ( token ) {
      // var expirationDate = jwtHelper.getTokenExpirationDate(token);
      const isExpired = jwtHelper.isTokenExpired(token);

      return !isExpired;
    }

    return false;
  }

  getUser(): UserInterface | null {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if ( token ) {
      const decoded = jwtHelper.decodeToken(token);
      return decoded.sub;
    }

    return null;
  }

}
