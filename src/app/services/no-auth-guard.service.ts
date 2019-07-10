import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard {
  path: ActivatedRouteSnapshot[];
  readonly route: ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if ( this.authService.isLoggedIn ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
