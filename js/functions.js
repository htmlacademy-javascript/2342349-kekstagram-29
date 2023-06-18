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
}



console.log("isStringLengthCorrect");
console.log(isStringLengthCorrect('проверяемая строка', 20)); // true
console.log(isStringLengthCorrect('проверяемая строка', 18)); // true
console.log(isStringLengthCorrect('проверяемая строка', 10)); // false

console.log("isPalindrome");
console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс'));  // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true

console.log("getNumberFromString");
console.log(getNumberFromString('2023 год'));            // 2023
console.log(getNumberFromString('ECMAScript 2022'));     // 2022
console.log(getNumberFromString('1 кефир, 0.5 батона')); // 105
console.log(getNumberFromString('агент 007'));           // 7
console.log(getNumberFromString('а я томат'));           // NaN
console.log(getNumberFromString(2023));            // 2023
console.log(getNumberFromString(-1));             // 1
console.log(getNumberFromString(1.5));            // 15

const a1 = 1;
const A2 = 2;
console.log(a1);
console.log(A2);
