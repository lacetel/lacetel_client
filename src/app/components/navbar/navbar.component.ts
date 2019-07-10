import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserCategory, str2category } from 'src/app/utils/enums';
import { LinkInterface, UserInterface } from 'src/app/utils/interfaces';
import { NAVBAR_LINKS } from 'src/app/utils/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links: LinkInterface[];
  scrollMode: boolean;
  lastLoggedState: boolean;

  constructor(private authService: AuthService) {
    this.scrollMode = false;
    this.links = NAVBAR_LINKS;
  }

  ngOnInit(): void {
    this.lastLoggedState = this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  isVisible(route: LinkInterface): boolean {

    // return true;

    // console.log('ROUTE: ', route);
    const isLogged = this.authService.isLoggedIn;

    if ( !isLogged && this.lastLoggedState ) {
      window.location.reload();
      return false;
    }

    this.lastLoggedState = isLogged;

    /// Default values
    route.reqlogin = route.hasOwnProperty('reqlogin') ? route.reqlogin : false;
    route.showLogged = route.hasOwnProperty('showLogged') ? route.showLogged : true;
    route.minlevel = route.hasOwnProperty('minlevel') ? route.minlevel : UserCategory.unregistered;

    if ( route.reqlogin && !isLogged ) {
      return false;
    }

    if ( !route.showLogged && isLogged ) {
      return false;
    }

    if ( isLogged && str2category(this.getUser.category as string) > route.minlevel ) {
      return false;
    }

    return true;
  }

  get getUser(): UserInterface | null {
    return this.authService.getUser();
  }

  get logoColor(): string {
    return this.scrollMode ? 'orange' : 'black';
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollMode = window.scrollY > 50;
  }

}
