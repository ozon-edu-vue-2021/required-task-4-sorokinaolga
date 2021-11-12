import { validValue, validDate } from '../helpers.js';

const validationType = {
  surname: 'text',
  name: 'text',
  patronym: 'text',
  email: 'email',
  series: 'series',
  number: 'number',
  latinSurname: 'latin',
  latinName: 'latin',
  lastSurname: 'text',
  lastName: 'text'
}

export function validationData(value) {
  let errors = [];
  for (let key in value) {
    if(value[key] && validationType[key] && !validValue(validationType[key], value[key])) {
      errors.push(key);
    }
    if(value[key] && key === 'birthdate' && !validDate(value[key])) {
      errors.push(key);
    }
  }

  return errors;
}