// const objects = [
//   { name: 'Karl' },
//   { name: 'Mia' },
// ];
//
// function each(objects, callback) {
//   object.
//   for (let object of objects) {
//     object.t
//
//     console.log(object);
//     const callback1 = callback(object);
//     console.log(callback1);
//   }
//
// }
//
// each(objects, function callback() {
//   this.name = this.name.split('').reverse().join('');
// });
//
// console.log(objects);
//

let poly = 1591;
let ylop = 0;
let isPalindrome = false;

let txt1 = poly.toString();
let txt2 = "";
for (let char of txt1) {
  txt2 = `${char}${txt2}`;
}

ylop = Number(txt2);
isPalindrome = (poly === ylop);

console.log(txt2);
