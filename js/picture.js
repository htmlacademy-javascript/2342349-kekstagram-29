import {openFullScreenClickHandler} from './fullscreen.js';

const drawPicture = (pictureData) => {

  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const pictureList = document.querySelector('.pictures');
  const pictureListFragment = new DocumentFragment();

  pictureData.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = `${picture.comments.length}`;
    pictureListFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => openFullScreenClickHandler(picture));
  });

  pictureList.appendChild(pictureListFragment);
};

export {drawPicture};
