import {initializeFullScreenViewer} from '../fullscreenViewer';
import {pictureList, pictureTemplate} from './domElements.js';

export const drawPicture = (pictureData) => {


  const pictureListFragment = new DocumentFragment();

  pictureData.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__info')
      .querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__info')
      .querySelector('.picture__comments').textContent = `${picture.comments.length}`;
    pictureListFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => initializeFullScreenViewer(picture));
  });
  pictureList.appendChild(pictureListFragment);
};
