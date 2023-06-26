import createPicture from './data.js';

const pictureArray = Array.from({length: 25}, createPicture);
console.log(JSON.stringify(pictureArray, null, 2));
