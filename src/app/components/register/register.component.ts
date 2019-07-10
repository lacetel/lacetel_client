import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { validateRegistration } from 'src/app/utils/validations';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: boolean;
  errorMsg: string;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  setErrorMsg(msg: string): void {
    this.error = true;
    this.errorMsg = msg;
  }

  register(form: NgForm, value) {

    this.error = false;

    if ( form.status !== 'VALID' ) {
      this.setErrorMsg('Faltan campos');
      return;
    }

    console.log('Form: ', form);

    const result = validateRegistration(value);

    if ( result !== 'OK' ) {
      this.setErrorMsg(result);
      return;
    }

    this.userService.register(value.email, value.password1)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, (err) => {
        this.setErrorMsg(err.json().message);
      });

  }

}
