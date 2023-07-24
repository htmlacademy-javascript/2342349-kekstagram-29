let globalErrorForm;
let globalErrorFormInner;
let globalErrorFormButton;
let globalErrorFormMessage;

function globalErrorFormClickHandler() {
  hideGlobalErrorForm();
}

function globalErrorFormClickOutsideHandler(event) {
  if (globalErrorFormInner.contains(event.target)) {
    return;
  }
  hideGlobalErrorForm();
}

function globalErrorFormEscKeyHandler(event) {
  if (event.code === 'Escape') {
    hideGlobalErrorForm();
  }
}

function showGlobalErrorForm(errorMessage) {
  globalErrorFormMessage.textContent = errorMessage;
  globalErrorForm.classList.remove('hidden');
  document.addEventListener('keydown', globalErrorFormEscKeyHandler);
  globalErrorFormButton.addEventListener('click', globalErrorFormClickHandler);
  document.addEventListener('click', globalErrorFormClickOutsideHandler);
}

function hideGlobalErrorForm() {
  globalErrorForm.classList.add('hidden');
  document.removeEventListener('keydown', globalErrorFormEscKeyHandler);
  globalErrorFormButton.removeEventListener('click', globalErrorFormClickHandler);
  document.removeEventListener('click', globalErrorFormClickOutsideHandler);
}

function initialize() {
  globalErrorForm = document.querySelector('#error')
    .content.querySelector('.error')
    .cloneNode(true);
  globalErrorFormInner = globalErrorForm.querySelector('.error__inner');
  globalErrorFormInner.classList.replace('error__inner', 'global_error__button');

  globalErrorFormButton = globalErrorForm.querySelector('.error__button');
  globalErrorFormButton.classList.replace('error__button', 'global_error__button');

  globalErrorFormMessage = document.createElement('p');
  globalErrorFormMessage.classList.add('error__message');
  globalErrorFormInner.appendChild(globalErrorFormMessage);

  hideGlobalErrorForm();
  document.body.appendChild(globalErrorForm);
}

export {initialize as initializeGlobalErrorForm, showGlobalErrorForm};
