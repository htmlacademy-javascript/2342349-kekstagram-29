const isStringLengthCorrect = (txt, length) => txt.length <= length;

const isPalindrome = (txt) => {
  const txtLower = txt.toLowerCase().replaceAll(' ', '');
  const arr1 = Array.from(txtLower);
  const arr2 = Array.from(txtLower).reverse();
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
};

const getNumberFromString = (txt) => {
  const digits = txt.toString().replaceAll(/\D/g, '');
  if (digits.length === 0) {
    return NaN;
  }
  return Number(digits);
};

const getMinutesFromText = (txt) => {
  const timeArr = txt.split(':');
  return parseInt(timeArr[1], 10) + (parseInt(timeArr[0], 10) * 60);
}

const isEnoughTime = (dayStartTxt, dayEndTxt, eventStartTxt, eventDurationMinutes) => {
  const dayStartMinutes = getMinutesFromText(dayStartTxt);
  const dayEndMinutes = getMinutesFromText(dayEndTxt);
  const eventStartMinutes = getMinutesFromText(eventStartTxt);
  return (eventStartMinutes >= dayStartMinutes) && (dayEndMinutes - (eventStartMinutes + eventDurationMinutes)) >= 0;
};

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
console.log(isEnoughTime('08:00', '17:30', '14:00', 90)); // true
console.log(isEnoughTime('8:0', '10:0', '8:0', 120));     // true
console.log(isEnoughTime('08:00', '14:30', '14:00', 90)); // false
console.log(isEnoughTime('14:00', '17:30', '08:0', 90));  // false
console.log(isEnoughTime('8:00', '17:30', '08:00', 900)); // false
