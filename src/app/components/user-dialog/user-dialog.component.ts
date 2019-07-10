import { Component, OnInit, Inject } from '@angular/core';
import { UserState, category2str, UserCategory, FlatUserCategory, FlatUserState, str2category, str2state } from 'src/app/utils/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserInterface } from 'src/app/utils/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PROVINCES } from 'src/app/utils/constants';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  myControl = new FormControl();
  filteredProvinces: Observable<string[]>;
  user: UserInterface;
  title: string;
  action: string;
  showPassword: boolean;
  states = FlatUserState;
  categories;
  provinces = PROVINCES;

  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface | null) {

      const idx: UserCategory = str2category(this.auth.getUser().category as string);
      this.categories = FlatUserCategory.slice(idx - 1, FlatUserCategory.length - 1);

      this.showPassword = false;

      if ( this.data ) {
        this.user = {
          age: this.data.age,
          category: str2category(this.data.category as string),
          configured: this.data.configured,
          email: this.data.email,
          name: this.data.name,
          password: '',
          phone: this.data.phone,
          province: this.data.province,
          state: str2state(this.data.state as string),
          username: this.data.username,
        };
        this.title = 'Editar usuario';
        this.action = 'Editar';
      } else {
        this.user = {
          age: -1,
          // category: category2str(UserCategory.user),
          category: UserCategory.user,
          configured: false,
          email: '',
          name: '',
          password: '',
          phone: '',
          province: '',
          state: UserState.PENDING,
          username: ''
        };
        this.title = 'Crear usuario';
        this.action = 'Guardar';
      }
  }

  get result() {
    return {
      user: this.user,
      action: this.action.toLowerCase()
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.filteredProvinces = this.myControl.valueChanges
      .pipe(map(value => this._filter(value)));
  }

  isValidPhone(phone) {
    while ( /^[0-9]{0,8}$/.test(phone.value) === false ) {
      phone.value = phone.value.substr(0, phone.value.length - 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.provinces.filter(province => province.toLowerCase().includes(filterValue));
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
