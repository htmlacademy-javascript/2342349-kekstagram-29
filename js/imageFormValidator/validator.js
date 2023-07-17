import {
  body,
  effectLevelRadioButtons,
  effectLevelValueElement,
  effectsPreviewElements,
  imageUploadCancel,
  imageUploadEffectLevel,
  imageUploadForm,
  imageUploadFormTag,
  imageUploadFormText,
  imageUploadInput,
  imageUploadOverlay,
  imageUploadPreview,
  imageUploadScaleControlBigger,
  imageUploadScaleControlSmaller,
  imageUploadScaleControlValue
} from './domElements.js';
import {
  applyPristineValidationRules,
  noUiSliderConfig,
  noUiSliderEffectLevelConfig,
  pristineConfig
} from './validatorRules.js';
import {
  IMAGE_UPLOAD_ENCTYPE,
  IMAGE_UPLOAD_METHOD,
  IMAGE_UPLOAD_TAG_REQUIRED,
  IMAGE_UPLOAD_TEXT_REQUIRED,
  IMAGE_UPLOAD_URL,
  SCALE_CONTROL_VALUE_MAX,
  SCALE_CONTROL_VALUE_MIN,
  SCALE_CONTROL_VALUE_STEP
} from './constants.js';
import {fileReader} from './utils.js';

const pristine = new Pristine(imageUploadForm, pristineConfig, true);
let scaleControlValueCurrent = 100;

function changeEffectLevelRadioButton(radioButton) {
  imageUploadPreview.style.filter = noUiSliderEffectLevelConfig.none.filter(0);
  const effectOptions = noUiSliderEffectLevelConfig[radioButton.value];
  noUiSliderConfig.updateOptions({
    start: effectOptions.max,
    step: effectOptions.step,
    range: {
      'min': effectOptions.min,
      'max': effectOptions.max
    }
  });
  if (radioButton.value === 'none') {
    imageUploadEffectLevel.classList.add('hidden');
  } else {
    imageUploadEffectLevel.classList.remove('hidden');
  }
}

function effectLevelRadioButtonHandler() {
  changeEffectLevelRadioButton(this);
}

function closeFormImageClickHandler() {
  closeFormEditImage();
}

function closeFormImageEscKeyHandler(event) {
  if (document.activeElement === imageUploadFormTag || document.activeElement === imageUploadFormText) {
    return;
  }
  if (event.code === 'Escape') {
    closeFormEditImage();
  }
}

function setScaleControl(value) {
  scaleControlValueCurrent = value;
  imageUploadScaleControlValue.value = `${scaleControlValueCurrent}%`;
  imageUploadPreview.style.transform = `scale(${scaleControlValueCurrent / 100})`;
}

function calculateScaleControl(step) {
  const scaleControlValueUpdated = scaleControlValueCurrent + step;
  if (scaleControlValueUpdated < SCALE_CONTROL_VALUE_MIN || scaleControlValueUpdated > SCALE_CONTROL_VALUE_MAX) {
    return;
  }
  setScaleControl(scaleControlValueUpdated);
}

function scaleControlSmallerClickHandler() {
  calculateScaleControl(-SCALE_CONTROL_VALUE_STEP);
}

function scaleControlBiggerClickHandler() {
  calculateScaleControl(SCALE_CONTROL_VALUE_STEP);
}

function openFormEditImage() {
  document.addEventListener('keydown', closeFormImageEscKeyHandler);
  imageUploadCancel.addEventListener('click', closeFormImageClickHandler);
  imageUploadForm.addEventListener('submit', submitFormEditHandler);
  imageUploadScaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
  imageUploadScaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
  effectLevelRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', effectLevelRadioButtonHandler);
  });

  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
}

function closeFormEditImage() {
  document.removeEventListener('keydown', closeFormImageEscKeyHandler);
  imageUploadCancel.removeEventListener('click', closeFormImageClickHandler);
  imageUploadForm.removeEventListener('submit', submitFormEditHandler);
  imageUploadScaleControlSmaller.removeEventListener('click', scaleControlSmallerClickHandler);
  imageUploadScaleControlBigger.removeEventListener('click', scaleControlBiggerClickHandler);
  effectLevelRadioButtons.forEach((radioButton) => {
    radioButton.removeEventListener('change', effectLevelRadioButtonHandler);
  });

  imageUploadInput.value = '';
  body.classList.remove('modal-open');
  imageUploadOverlay.classList.add('hidden');
  pristine.reset();
  setScaleControl(100);
  changeEffectLevelRadioButton({value: 'none'});
}

function imageUploadInputChangeHandler() {
  if (imageUploadInput.files.length > 0) {
    fileReader.readAsDataURL(imageUploadInput.files[0]);
  }
}

function imageFileLoadHandler(event) {
  imageUploadPreview.src = event.target.result;
  effectsPreviewElements.forEach((element) => {
    element.style.backgroundImage = `url("${imageUploadPreview.src}")`;
  });
  openFormEditImage();
}

function submitFormEditHandler(event) {
  event.preventDefault();
  if (pristine.validate()) {
    //todo
    //event.target.submit();
  }
}

function prepareHtmlForms() {
  imageUploadForm.method = IMAGE_UPLOAD_METHOD;
  imageUploadForm.action = IMAGE_UPLOAD_URL;
  imageUploadForm.enctype = IMAGE_UPLOAD_ENCTYPE;
  imageUploadFormTag.required = IMAGE_UPLOAD_TAG_REQUIRED;
  imageUploadFormText.required = IMAGE_UPLOAD_TEXT_REQUIRED;
}

export function initializeValidator() {
  prepareHtmlForms();
  applyPristineValidationRules(pristine);

  imageUploadEffectLevel.classList.add('hidden');
  imageUploadInput.addEventListener('change', imageUploadInputChangeHandler);
  fileReader.onload = imageFileLoadHandler;
  noUiSliderConfig.on('update', (values, handle) => {
    const value = values[handle];
    const effectType = document.querySelector('.effects__radio:checked').value;
    const filterValue = noUiSliderEffectLevelConfig[effectType].filter(value);
    effectLevelValueElement.value = value;
    imageUploadPreview.style.filter = filterValue;
  });
}
