export function debounce(f, t) {
  const calls = {
    lastCallTimer: null
  };
  return function (args) {
    if(calls.lastCallTimer !== null) {
      clearTimeout(calls.lastCallTimer);
    }
    calls.lastCallTimer = setTimeout(() => f(args), t);
  }
}

const validationReg = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  text: /^[а-яА-ЯёЁ\s]+$/,
  latin: /^[A-Za-z]+$/,
  series: /^([0-9]{4})?$/,
  number: /^([0-9]{6})?$/
}

export function validValue(type, value) {
  return validationReg[type].test(value);
}

export function validDate(validatedDate) {
  const date = new Date(validatedDate).getTime();
  const currentDate = Date.now();

  if(date <= currentDate) {
    return true;
  } else {
    return false;
  }
}