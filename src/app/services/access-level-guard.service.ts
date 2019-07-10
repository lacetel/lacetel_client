import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserInterface } from '../utils/interfaces';
import { ROUTE_LEVEL } from '../utils/constants';
import { str2category } from '../utils/enums';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  readonly route: ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {

    const user: UserInterface = this.auth.getUser();

    if ( ROUTE_LEVEL.hasOwnProperty(state.url) === true &&
         str2category(user.category as string) <= ROUTE_LEVEL[ state.url ] ) {
      return true;
    }

    this.router.navigate(['/']);
    return false;

  }

}
