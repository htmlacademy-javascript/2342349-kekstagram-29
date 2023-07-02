import createPicture from './data.js';
import {drawPicture} from './picture.js';

const pictureArray = Array.from({length: 25}, createPicture);
// console.log(JSON.stringify(pictureArray, null, 2));
drawPicture(pictureArray);


