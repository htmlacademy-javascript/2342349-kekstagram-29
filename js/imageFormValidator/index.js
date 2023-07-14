import {
  COMMENT_LENGTH_MAX,
  HASHTAG_COUNT_MAX,
  HASHTAG_LENGTH_MAX,
  IMAGE_UPLOAD_METHOD,
  IMAGE_UPLOAD_URL,
  SCALE_CONTROL_VALUE_MAX,
  SCALE_CONTROL_VALUE_MIN,
  SCALE_CONTROL_VALUE_STEP
} from './constants.js';
import {
  body,
  effectLevelRadioButtons,
  effectLevelSliderElement,
  effectLevelValueElement,
  imageUploadCancel,
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

const fileReader = new FileReader();
const config = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'error-message'
};
const pristine = new Pristine(imageUploadForm, config, true);

const effectLevelSlider = noUiSlider.create(effectLevelSliderElement, {
  start: [100],
  range: {
    'min': [0],
    'max': [100]
  }
});
const effectLevelSliderOptions = {
  'chrome': {min: 0, max: 1, step: 0.1, filter: (value) => `grayscale(${value})`},
  'sepia': {min: 0, max: 1, step: 0.1, filter: (value) => `sepia(${value})`},
  'marvin': {min: 0, max: 100, step: 1, filter: (value) => `invert(${value}%)`},
  'phobos': {min: 0, max: 3, step: 0.1, filter: (value) => `blur(${value}px)`},
  'heat': {min: 1, max: 3, step: 0.1, filter: (value) => `brightness(${value})`},
  'none': {min: 0, max: 1, step: 1, filter: (_) => 'none'}
};

let scaleControlValueCurrent = 100;

function changeEffectLevelRadioButton(radioButton) {
  imageUploadPreview.style.filter = effectLevelSliderOptions.none.filter(0);
  const effectOptions = effectLevelSliderOptions[radioButton.value];
  effectLevelSlider.updateOptions({
    start: effectOptions.max,
    step: effectOptions.step,
    range: {
      'min': effectOptions.min,
      'max': effectOptions.max
    }
  });
}

function effectLevelRadioButtonHandler() {
  changeEffectLevelRadioButton(this);
}

effectLevelSlider.on('update', (values, handle) => {
  const value = values[handle];
  const effectType = document.querySelector('.effects__radio:checked').value;
  const filterValue = effectLevelSliderOptions[effectType].filter(value);
  effectLevelValueElement.value = value;
  imageUploadPreview.style.filter = filterValue;
});

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

function changeScaleControl(step) {
  const scaleControlValueUpdated = scaleControlValueCurrent + step;
  if (scaleControlValueUpdated < SCALE_CONTROL_VALUE_MIN || scaleControlValueUpdated > SCALE_CONTROL_VALUE_MAX) {
    return;
  }
  scaleControlValueCurrent = scaleControlValueUpdated;
  imageUploadScaleControlValue.value = `${scaleControlValueCurrent}%`;
  imageUploadPreview.style.transform = `scale(${scaleControlValueCurrent / 100})`;
}

function scaleControlSmallerClickHandler() {
  changeScaleControl(-SCALE_CONTROL_VALUE_STEP);
}

function scaleControlBiggerClickHandler() {
  changeScaleControl(SCALE_CONTROL_VALUE_STEP);
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

function imageUploadInputChangeHandler() {
  if (imageUploadInput.files.length > 0) {
    fileReader.readAsDataURL(imageUploadInput.files[0]);
  }
}

function imageFileLoadHandler(event) {
  imageUploadPreview.src = event.target.result;
  openFormEditImage();
}

function splitHashtags(value) {
  return value.split(/\s+/);
}

function submitFormEditHandler(event) {
  event.preventDefault();
  console.log(pristine.validate());
  if (pristine.validate()) {
    //todo
    //event.target.submit();
    console.log('submit');
  }
}

function initialize() {
  imageUploadForm.method = IMAGE_UPLOAD_METHOD;
  imageUploadForm.action = IMAGE_UPLOAD_URL;
  imageUploadForm.enctype = 'multipart/form-data';
  imageUploadFormTag.required = true;
  fileReader.onload = imageFileLoadHandler;

  pristine.addValidator(imageUploadFormText, (text) =>
    text.length <= COMMENT_LENGTH_MAX, 'The comment is too long');

  pristine.addValidator(imageUploadFormTag, (value) =>
    splitHashtags(value).every((hashtag) =>
      hashtag[0] === '#'), 'All hashtags must start with #', 1, true);

  pristine.addValidator(imageUploadFormTag, (value) =>
    splitHashtags(value).every((hashtag) =>
      /^[#][A-Za-z0-9]+$/.test(hashtag)), 'Hashtags should contain only letters and numbers', 2, true);

  pristine.addValidator(imageUploadFormTag, (value) =>
    splitHashtags(value).every((hashtag) =>
      hashtag.length > 1), 'Hashtag cannot consist of a single #', 3, true);

  pristine.addValidator(imageUploadFormTag, (value) =>
    splitHashtags(value).every((hashtag) =>
      hashtag.length <= HASHTAG_LENGTH_MAX), 'Hashtag length should not exceed 20 characters', 4, true);

  pristine.addValidator(imageUploadFormTag, (value) =>
    splitHashtags(value).length <= HASHTAG_COUNT_MAX, 'Number of hashtags should not exceed 5', 5, true);

  pristine.addValidator(imageUploadFormTag, (value) => {
    const lowercaseHashtags = splitHashtags(value).map((hashtag) => hashtag.toLowerCase());
    const uniqueHashtags = new Set(lowercaseHashtags);
    return uniqueHashtags.size === lowercaseHashtags.length;
  }, 'Each hashtag should be unique', 6, true);

  imageUploadInput.addEventListener('change', imageUploadInputChangeHandler);
}

export {initialize as initializeImageFormValidator};
