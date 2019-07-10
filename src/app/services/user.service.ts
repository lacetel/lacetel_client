import { Injectable } from '@angular/core';
import { API_HOST_PORT } from '../config/server';
import { map } from 'rxjs/operators';
import { UserInterface } from '../utils/interfaces';
import { state2str, UserState } from '../utils/enums';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.
      get(API_HOST_PORT + '/users').
      pipe(map((result: UserInterface[]) => {
        return result.map((e: UserInterface) => {
          const obj = Object.create(e);
          obj.state = state2str(e.state as UserState);
          return obj;
        });
      }));
  }

  modifyUser(user: UserInterface) {
    return this.http.put(API_HOST_PORT + '/modifyUser', user);
  }

  createUser(user: UserInterface) {
    return this.http.post(API_HOST_PORT + '/register', user);
  }

  register(email: string, password: string) {
    return this.http.post(API_HOST_PORT + '/register', {
      email,
      password
    });
  }

  deleteUser(email: string) {
    return this.http.delete(API_HOST_PORT + '/user/' + email);
  }

}
