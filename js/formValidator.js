const body = document.querySelector('body');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadFormTag = document.querySelector('.text__hashtags');
const imageUploadFormText = document.querySelector('.text__description');

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const pristine = new Pristine(imageUploadForm);
pristine.addValidator(imageUploadFormText, (text) =>
  text.length <= MAX_COMMENT_LENGTH, 'The comment is too long');
pristine.addValidator(imageUploadFormTag, (value) =>
  value.split(/\s+/).every((hashtag) =>
    hashtag[0] === '#'), 'All hashtags must start with #');

pristine.addValidator(imageUploadFormTag, (value) =>
  value.split(/\s+/).every((hashtag) =>
    /^[#][A-Za-z0-9]+$/.test(hashtag)), 'Hashtags should contain only letters and numbers');

pristine.addValidator(imageUploadFormTag, (value) =>
  value.split(/\s+/).every((hashtag) =>
    hashtag.length > 1), 'Hashtag cannot consist of a single #');

pristine.addValidator(imageUploadFormTag, (value) =>
  value.split(/\s+/).every((hashtag) =>
    hashtag.length <= MAX_HASHTAG_LENGTH), 'Hashtag length should not exceed 20 characters');

pristine.addValidator(imageUploadFormTag, (value) =>
  value.split(/\s+/).length <= MAX_HASHTAG_COUNT, 'Number of hashtags should not exceed 5');

pristine.addValidator(imageUploadFormTag, (value) => {
  const lowercaseHashtags = value.split(/\s+/).map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(lowercaseHashtags);
  return uniqueHashtags.size === lowercaseHashtags.length;
}, 'Each hashtag should be unique');

function initialize() {
  imageUploadInput.addEventListener('change', imageUploadInputChangeHandler);
}

function imageUploadInputChangeHandler() {
  openFormEditImage();
}

function closeFormImageEscKeyHandler(event) {
  if (document.activeElement === imageUploadFormTag || document.activeElement === imageUploadFormText) {
    return;
  }
  if (event.code === 'Escape') {
    closeFormEditImage();
  }
}

function closeFormImageClickHandler() {
  closeFormEditImage();
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

function openFormEditImage() {
  console.log(imageUploadInput.files[0].name);
  document.addEventListener('keydown', closeFormImageEscKeyHandler);
  imageUploadCancel.addEventListener('click', closeFormImageClickHandler);
  imageUploadForm.addEventListener('submit', submitFormEditHandler);


  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
}

function closeFormEditImage() {
  document.removeEventListener('keydown', closeFormImageEscKeyHandler);
  imageUploadCancel.removeEventListener('click', closeFormImageClickHandler);
  imageUploadCancel.removeEventListener('submit', submitFormEditHandler);
  imageUploadInput.value = '';

  body.classList.remove('modal-open');
  imageUploadOverlay.classList.add('hidden');
}

export {initialize};
