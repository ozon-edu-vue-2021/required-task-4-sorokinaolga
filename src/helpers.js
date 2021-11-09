export function throttle(f, t) {
  const calls = {};
  return function (args) {
    let previousCall = calls.lastCall;
    if (previousCall === undefined || Date.now() - previousCall > t) {
      calls.lastCall = Date.now();
      f(args);
    }
  };
}
export function validEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function validText(text) {
  var re = /^[а-яА-ЯёЁ\s]+$/;
  return re.test(text);
}
export function validLatin(text) {
  var re = /^[A-Za-z]+$/;
  return re.test(text);
}
export function validSeries(number) {
  var re = /^([0-9]{4})?$/;
  return re.test(number);
}
export function validNumber(number) {
  var re = /^([0-9]{6})?$/;
  return re.test(number);
}
export function validDate(validatedDate) {
  const date = validatedDate.split('-');
  const year = Number(date[0]);
  const month = Number(date[1]);
  const day = Number(date[2]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  if(year < currentYear) {
    return true;
  } 
  else if(year === currentYear) {
    if(month < currentMonth) {
      return true;
    }
    else if(month === currentMonth) {
      if(day <= currentDay) {
        return true;
      } else { return false }
    } else { return false }
  } else { return false }
}