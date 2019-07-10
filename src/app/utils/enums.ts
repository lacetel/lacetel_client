export const enum UserCategory {
  superadmin = 1,
  admin = 2,
  moderador = 3,
  user = 4,
  unregistered = 5,
}

export const FlatUserCategory = [
  ['superadmin', 'SuperAdmin', 1],
  ['admin', 'Administrador', 2],
  ['moderador', 'Moderador', 3],
  ['user', 'Usuario', 4],
  ['unregistered', 'No registrado', 5]
];

export const enum UserState {
  ACTIVE = 1,
  INACTIVE = 2,
  PENDING = 3,
}

export const FlatUserState = [
  ['ACTIVE', 'Activo', 1],
  ['INACTIVE', 'Inactivo', 2],
  ['PENDING', 'Pendiente', 3],
];

export function state2str(state: UserState): string {
  switch (state) {
    case UserState.ACTIVE: {
      return 'Activo';
    }
    case UserState.INACTIVE: {
      return 'Inactivo';
    }
    case UserState.PENDING: {
      return 'Pendiente';
    }
    default:
      throw new TypeError('Unrecognized enum state ' + state);
  }
}

export function str2state(state: string): UserState {
  switch (state) {
    case 'Activo': {
      return UserState.ACTIVE;
    }
    case 'Inactivo': {
      return UserState.INACTIVE;
    }
    case 'Pendiente': {
      return UserState.PENDING;
    }
    default:
      throw new TypeError('Unrecognized enum state ' + state);
  }
}

export function category2str(category: UserCategory): string {

  switch (category) {
    case UserCategory.superadmin: {
      return 'superadmin';
    }
    case UserCategory.admin: {
      return 'admin';
    }
    case UserCategory.moderador: {
      return 'moderador';
    }
    case UserCategory.user: {
      return 'user';
    }
    case UserCategory.unregistered: {
      return 'unregistered';
    }
    default:
      throw new TypeError('Unrecognized enum category ' + category);
  }

}

export function str2category(category: string): UserCategory {

  switch (category) {
    case 'superadmin': {
      return UserCategory.superadmin;
    }
    case 'admin': {
      return UserCategory.admin;
    }
    case 'moderador': {
      return UserCategory.moderador;
    }
    case 'user': {
      return UserCategory.user;
    }
    case 'unregistered': {
      return UserCategory.unregistered;
    }
    default:
      throw new TypeError('Unrecognized string category ' + category);
  }

}
