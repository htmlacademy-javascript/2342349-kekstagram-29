import {COMMENTS_FOR_LOAD} from './constants.js';
import {
  bigPicture,
  bodyElement,
  cancelButton,
  comments,
  commentsCount,
  image,
  likesCount,
  loadCommentButton,
  socialCaption,
  templateComment
} from './domElements.js';

let commentLoader;

function createLoadComment(pictureData) {
  let commentIndex = 0;
  return function () {
    const fragment = new DocumentFragment();
    const newCommentRange = Math.min(commentIndex + COMMENTS_FOR_LOAD, pictureData.comments.length);

    for (let i = commentIndex; i < newCommentRange; i++) {
      const commentElement = pictureData.comments[i];
      const comment = templateComment.cloneNode(true);
      comment.querySelector('img').src = commentElement.avatar;
      comment.querySelector('img').alt = commentElement.name;
      comment.querySelector('p').textContent = commentElement.message;
      fragment.appendChild(comment);
    }
    commentIndex = newCommentRange;
    comments.appendChild(fragment);

    commentsCount.textContent = `${commentIndex} из ${pictureData.comments.length} комментариев`;
    commentButtonActivator(pictureData.comments.length, commentIndex);
  };
}

function commentButtonActivator(commentCount, displayedCommentsCount) {
  if (commentCount <= COMMENTS_FOR_LOAD || displayedCommentsCount === commentCount) {
    loadCommentButton.classList.add('hidden');
  } else {
    loadCommentButton.classList.remove('hidden');
  }
}

function closeFullScreenEscKeyHandler(event) {
  if (event.code === 'Escape') {
    closeFullScreen();
  }
}

function closeFullScreenClickHandler() {
  closeFullScreen();
}

function closeFullScreen() {
  bodyElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  cancelButton.removeEventListener('click', closeFullScreenClickHandler);
  document.removeEventListener('keydown', closeFullScreenEscKeyHandler);
  loadCommentButton.removeEventListener('click', commentLoader);
}

export function openFullScreen(pictureData) {
  commentLoader = createLoadComment(pictureData);
  cancelButton.addEventListener('click', closeFullScreenClickHandler);
  document.addEventListener('keydown', closeFullScreenEscKeyHandler);
  loadCommentButton.addEventListener('click', commentLoader);

  comments.innerHTML = '';
  commentLoader();
  image.src = pictureData.url;
  image.alt = pictureData.description;
  socialCaption.textContent = pictureData.description;
  likesCount.textContent = pictureData.likes;

  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
}
