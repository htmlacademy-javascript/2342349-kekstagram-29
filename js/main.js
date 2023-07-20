import {initializePictureViewer} from './pictureViewer';
import {initializeImageFormValidator} from './imageFormValidator';
import {loadData} from './fetch.js';

const IMAGE_DOWNLOAD_URL = 'https://29.javascript.pages.academy/kekstagram/data';
loadData(IMAGE_DOWNLOAD_URL).then((pictureData) => initializePictureViewer(pictureData));

initializeImageFormValidator();
