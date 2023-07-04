const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const image = bigPicture.querySelector('.big-picture__img img');
const socialDiv = bigPicture.querySelector('.social__header');
const socialCaption = socialDiv.querySelector('.social__caption');
const likesCount = socialDiv.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const comments = bigPicture.querySelector('.social__comments');
const templateComment = comments.querySelector('.social__comment');

function openFullScreen(event, pictureData) {
  cancelButton.addEventListener('click', closeFullScreen);
  document.addEventListener('keydown', closeFullScreen);

  image.src = pictureData.url;
  image.alt = pictureData.description;
  socialCaption.textContent = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = `${pictureData.comments.length}`;

  comments.innerHTML = '';
  const fragment = new DocumentFragment();
  for (const commentElement of pictureData.comments) {
    const comment = templateComment.cloneNode(true);
    const commentPicture = comment.querySelector('img');
    const commentText = comment.querySelector('p');

    commentPicture.src = commentElement.avatar;
    commentPicture.alt = commentElement.name;
    commentText.textContent = commentElement.message;

    fragment.appendChild(comment);
  }
  comments.appendChild(fragment);

  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  // temp
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
}

function closeFullScreen(event) {
  const isEscapeKey = event.type === 'keydown' && event.key === 'Escape';
  const isClick = event.type === 'click';

  if (isEscapeKey || isClick) {
    bodyElement.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    cancelButton.removeEventListener('click', closeFullScreen);
    document.removeEventListener('keydown', closeFullScreen);
  }
}

export {openFullScreen};
