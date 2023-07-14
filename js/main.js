import createPicture from './data.js';
import {drawPicture} from './picture.js';
import {initializeImageFormValidator} from './imageFormValidator';

const pictureArray = Array.from({length: 25}, createPicture);
drawPicture(pictureArray);

initializeImageFormValidator();
