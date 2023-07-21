import {IMAGE_DOWNLOAD_URL} from './constants/constants.js';
import {initializePictureViewer} from './pictureViewer';
import {initializeImageFormValidator} from './imageFormValidator';
import {fetchData} from './utils/http.js';
import {initializeGlobalErrorForm, showGlobalErrorForm} from './errors/globalErrorForm.js';

initializeGlobalErrorForm();

fetchData(IMAGE_DOWNLOAD_URL)
  .then((pictureData) => initializePictureViewer(pictureData))
  .catch((error) => showGlobalErrorForm(error.message));
initializeImageFormValidator();
