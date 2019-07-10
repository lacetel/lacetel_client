import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: UserInterface;

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
    // console.log(this.user);
  }

  ngOnInit() {
  }

}
