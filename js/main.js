import createPicture from './data.js';
import {drawPicture} from './picture.js';

const pictureArray = Array.from({length: 25}, createPicture);
drawPicture(pictureArray);


