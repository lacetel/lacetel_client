import { UserCategory, str2category } from './enums';
import { EMAIL_REGEXP } from './constants';

export function validateRegistration(value): string {

  console.log('Testing: ', value);

  if ( !EMAIL_REGEXP.test( value.email ) ) {
    return 'Email no válido';
  }

  if ( value.password1 === '' || value.password2 === '' ) {
    return 'Contraseña en blanco';
  }

  if ( value.password1 !== value.password2 ) {
    return 'No coinciden las contraseñas';
  }

  return 'OK';

}

export function userLevelGte(cat1: UserCategory | string, cat2: UserCategory | string): boolean {
  const c1 = ( typeof cat1 === 'string' ) ? str2category(cat1) : cat1;
  const c2 = ( typeof cat2 === 'string' ) ? str2category(cat2) : cat2;

  return c1 <= c2;
}
