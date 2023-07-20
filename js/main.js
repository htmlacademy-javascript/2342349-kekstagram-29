import {IMAGE_DOWNLOAD_URL} from './constants.js';
import {initializePictureViewer} from './pictureViewer';
import {initializeImageFormValidator} from './imageFormValidator';
import {fetchData} from './http.js';
import {initializeGlobalErrorForm, showGlobalErrorForm} from './globalErrorForm.js';

initializeGlobalErrorForm();

fetchData(IMAGE_DOWNLOAD_URL)
  .then((pictureData) => initializePictureViewer(pictureData))
  .catch((error) => showGlobalErrorForm(error.message));

initializeImageFormValidator();
