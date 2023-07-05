const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const image = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const comments = bigPicture.querySelector('.social__comments');
const templateComment = comments.querySelector('.social__comment');
const loadCommentButton = bigPicture.querySelector('.social__comments-loader');

const COMMENTS_FOR_LOAD = 5;
let commentLoader;

function createLoadComment(pictureData) {
  let commentIndex = 0;
  return function() {
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
  };
}

function closeFullScreen() {
  bodyElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  cancelButton.removeEventListener('click', closeFullScreenHandler);
  document.removeEventListener('keydown', closeFullScreenHandler);
  loadCommentButton.removeEventListener('click', commentLoader);
}

function closeFullScreenHandler(event) {
  const isEscapeKey = event.type === 'keydown' && event.code === 'Escape';
  const isClick = event.type === 'click';
  if (isEscapeKey || isClick) {
    closeFullScreen();
  }
}

function openFullScreen(event, pictureData) {
  commentLoader = createLoadComment(pictureData);
  cancelButton.addEventListener('click', closeFullScreenHandler);
  document.addEventListener('keydown', closeFullScreenHandler);
  loadCommentButton.addEventListener('click', commentLoader);

  comments.innerHTML = '';
  commentLoader();
  image.src = pictureData.url;
  image.alt = pictureData.description;
  socialCaption.textContent = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = `${pictureData.comments.length}`;

  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
}

export { openFullScreen };
