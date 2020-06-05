import { UserCategory } from './enums';
import { LinkInterface } from './interfaces';

export const PROVINCES = [
  'Pinar del Río',
  'Artemisa',
  'La Habana',
  'Mayabeque',
  'Isla de la Juventud',
  'Matanzas',
  'Cienfuegos',
  'Villa Clara',
  'Sancti Spiritus',
  'Ciego de Ávila',
  'Camagüey',
  'Las Tunas',
  'Holguín',
  'Granma',
  'Santiago de Cuba',
  'Guantánamo',
];

export const NAVBAR_LINKS = [
  {
    route: '/',
    content: 'Inicio',
    icon: 'home',
    childs: []
  },
  {
    route: '',
    content: 'Servicios',
    icon: 'chevron-down',
    minlevel: UserCategory.user,
    reqlogin: true,
    childs: [
      {
        route: '/mapas',
        content: 'Mapas',
        icon: 'map',
        childs: []
      },
      {
        route: '/eventos',
        content: 'Eventos',
        icon: 'calendar-alert',
        childs: []
      },
      {
        route: '/graficos',
        content: 'Graficos',
        icon: 'chart-line-variant',
        childs: []
      }
    ]
  },
  {
    route: '/sensores',
    content: 'Sensores',
    icon: 'access-point',
    reqlogin: true,
    childs: []
  },
  {
    route: '/aboutUs',
    content: 'Quienes somos',
    icon: 'account-question',
    childs: []
  },
  // {
  //   route: '/tools',
  //   content: 'Herramientas',
  //   icon: 'screwdriver',
  //   childs: []
  // },
  {
    route: '/users',
    content: 'Usuarios',
    icon: 'account-multiple',
    minlevel: UserCategory.moderador,
    reqlogin: true,
    childs: []
  },
  {
    route: '/login',
    content: 'Entrar',
    icon: 'login',
    showLogged: false,
    childs: []
  },
  {
    route: '/register',
    content: 'Registrarse',
    icon: 'account-badge-horizontal',
    showLogged: false,
    childs: []
  },
];

const tempRl = {};

const rec = (arr: LinkInterface[]) => {
  for (let i = 0, maxi = arr.length; i < maxi; i += 1) {
    tempRl[ arr[i].route ] = arr[i].minlevel || UserCategory.unregistered;
    rec(arr[i].childs);
  }
};

rec(NAVBAR_LINKS);

export const ROUTE_LEVEL = tempRl;

/* tslint:disable */
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const HOST = 'https://myhost.com/';