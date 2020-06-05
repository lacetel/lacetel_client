import { UserCategory, UserState } from './enums';

export interface Credentials {
  username: string;
  password: string;
}

export interface LinkInterface {
  route: string;
  content: string;
  reqlogin?: boolean;        /// Default: false
  showLogged?: boolean;     /// Default: true
  minlevel?: UserCategory;  /// Default: unregistered
  icon?: string;
  childs: LinkInterface[];
}

export interface UserInterface {
  name?: string;
  username?: string;
  email: string;
  password: string;
  age?: number;
  phone?: string;
  province?: string;
  configured?: boolean;
  state?: UserState | string;
  category: UserCategory | string;
}

export interface UserDialogInterface {
  user: UserInterface;
  action: 'editar' | 'guardar';
}