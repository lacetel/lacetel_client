import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from 'src/app/utils/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string;
  enterLabel: string;
  userPlaceholder: string;
  passwordPlaceholder: string;
  error: boolean;
  errorMsg: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.title = 'Bienvenido';
    this.enterLabel = 'Entrar';
    this.userPlaceholder = 'Usuario o email';
    this.passwordPlaceholder = 'Contraseña';
    this.errorMsg = '';
    this.error = false;
  }

  ngOnInit() {
  }

  setErrorMsg(msg: string): void {
    this.error = true;
    this.errorMsg = msg;
  }

  login(credentials: Credentials) {
    this.error = false;
    // console.log(credentials);

    credentials.username = credentials.username.trim();

    if ( credentials.username === '' || credentials.password === '' ) {
      this.setErrorMsg('Faltan campos por rellenar');
      return;
    }

    this.auth.login(credentials).subscribe((isLoggedIn: boolean) => {

      if ( isLoggedIn ) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([ returnUrl || '/' ]);
      } else {
        this.setErrorMsg('Usuario o contraseña incorrectos');
      }

    }, (err: HttpErrorResponse) => {
      console.log('login.component ERROR: ', err);
      if ( err.status === 0 ) {
        this.setErrorMsg('Por favor, revise su conexión');
      } else {
        this.setErrorMsg(err.error.message);
      }
    });
  }

}
