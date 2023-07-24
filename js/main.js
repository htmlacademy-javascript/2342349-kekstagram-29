import {IMAGE_DOWNLOAD_URL} from './constants/constants.js';
import {initializePictureViewer} from './picture-viewer/index.js';
import {initializeImageFormValidator} from './image-form-validator/index.js';
import {fetchData} from './utils/http.js';
import {initializeGlobalErrorForm, showGlobalErrorForm} from './errors/global-error-form.js';

initializeGlobalErrorForm();

fetchData(IMAGE_DOWNLOAD_URL)
  .then((pictureData) => initializePictureViewer(pictureData))
  .catch((error) => showGlobalErrorForm(error.message));
initializeImageFormValidator();
