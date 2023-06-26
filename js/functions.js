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
};

const isEnoughTime = (dayStartTxt, dayEndTxt, eventStartTxt, eventDurationMinutes) => {
  const dayStartMinutes = getMinutesFromText(dayStartTxt);
  const dayEndMinutes = getMinutesFromText(dayEndTxt);
  const eventStartMinutes = getMinutesFromText(eventStartTxt);
  return (eventStartMinutes >= dayStartMinutes) && (dayEndMinutes - (eventStartMinutes + eventDurationMinutes)) >= 0;
};
