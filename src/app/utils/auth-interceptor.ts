import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if ( token ) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
