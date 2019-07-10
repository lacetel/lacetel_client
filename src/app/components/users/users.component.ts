import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface, UserDialogInterface } from 'src/app/utils/interfaces';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { category2str, UserCategory } from 'src/app/utils/enums';
import { AuthService } from 'src/app/services/auth.service';
import { userLevelGte } from 'src/app/utils/validations';
import Swal from 'sweetalert2';

const COLUMNS: string[] = [
  'name',
  'username',
  'email',
  'age',
  'phone',
  'province',
  'state',
  'category',
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserInterface[];
  columns = COLUMNS;
  loading: boolean;
  error: boolean;
  currentUser: UserInterface;
  isAdmin: boolean;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private userService: UserService) {

    this.currentUser = this.auth.getUser();
    this.isAdmin = userLevelGte(this.currentUser.category as string, UserCategory.admin);

    if ( this.isAdmin ) {
      while ( this.columns.indexOf('controls') > -1 ) {
        this.columns.splice( this.columns.indexOf('controls'), 1 );
      }
      this.columns.push('controls');
    }

    this.getUsers();

  }

  ngOnInit() {
  }

  getUsers() {
    this.loading = true;
    this.error = false;
    this.userService.getUsers().subscribe({
      next: (result: UserInterface[]) => {
        this.users = [].concat(result);
        // console.log('USERS: ', this.users);
        this.loading = false;
        this.error = false;
      },
      error: (err) => {
        console.log('users.component ERROR: ', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  createOrModifyUser(user: UserInterface | null) {

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe((dialogResult: UserDialogInterface | null) => {

      if ( dialogResult ) {
        const newUser: UserInterface = dialogResult.user;

        newUser.category = category2str(newUser.category as UserCategory);

        let obs;

        if ( dialogResult.action === 'guardar' ) {
          obs = this.userService.createUser(newUser);
        } else {
          obs = this.userService.modifyUser(newUser);
        }

        obs.subscribe({
          next: (res) => {
            this.getUsers();
          },
          error: (err) => {
            console.log('users.component modifyUser|register ERROR: ', err);
          }
        });
      }
    });
  }

  confirmDelete(user: UserInterface) {

    if ( user.email === this.currentUser.email && false ) {
      Swal.fire({
        title: 'Error',
        text: 'No puedes eliminar tu propio usuario',
        type: 'error'
      });
    } else {
      Swal.fire({
        title: 'Eliminar usuario',
        text: 'Desea eliminar este usuario?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((res) => {
        if ( res.value ) {
          this.userService.deleteUser(user.email).subscribe({
            next: (result: { message: string }) => {
              Swal.fire('Eliminado', result.message, 'success');
              this.getUsers();
            },
            error: (err) => {
              console.log('users.component confirmDelete ERROR: ', err);
              Swal.fire('Error', err.error.message, 'error');
            }
          });
        }
      });
    }
  }

}
