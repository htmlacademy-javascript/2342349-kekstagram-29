import createPicture from './data.js';
import {drawPicture} from './picture.js';
import {initialize as initializeFormValidator} from './formValidator.js';

const pictureArray = Array.from({length: 25}, createPicture);
drawPicture(pictureArray);

initializeFormValidator();
