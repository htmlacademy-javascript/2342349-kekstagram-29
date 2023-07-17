import createPicture from './data.js';
import {initializePictureViewer} from './pictureViewer';
import {initializeImageFormValidator} from './imageFormValidator';

const pictureArray = Array.from({length: 25}, createPicture);
initializePictureViewer(pictureArray);
initializeImageFormValidator();
