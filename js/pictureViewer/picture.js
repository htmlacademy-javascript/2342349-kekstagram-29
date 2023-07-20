import {initializeFullScreenViewer} from '../fullscreenViewer';
import {pictureList, pictureTemplate} from './domElements.js';

const drawPicture = (pictureData) => {
  const pictureListFragment = new DocumentFragment();

  pictureData.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const pictureImg = pictureElement.querySelector('.picture__img');
    pictureImg.src = picture.url;
    pictureImg.alt = picture.description;

    const pictureInfo = pictureElement.querySelector('.picture__info');
    pictureInfo.querySelector('.picture__likes').textContent = picture.likes;
    pictureInfo.querySelector('.picture__comments').textContent = `${picture.comments.length}`;

    pictureListFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => initializeFullScreenViewer(picture));
  });
  pictureList.appendChild(pictureListFragment);
};

export {drawPicture};
