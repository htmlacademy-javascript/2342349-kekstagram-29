import getRandomInteger from './utils.js';

const messagePool = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.'
];

const namePool = ['John', 'Mary', 'James', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'Daniel', 'Sophia'];

const createComments = (_, index) => ({
  id: 100 + index,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message:
    getRandomInteger(1, 2) > 1
      ? `${messagePool[getRandomInteger(0, messagePool.length - 1)]} ${messagePool[getRandomInteger(0, messagePool.length - 1)]}`
      : messagePool[getRandomInteger(0, messagePool.length - 1)],
  name: namePool[getRandomInteger(0, namePool.length - 1)]
});

const createPicture = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: (`_description_text_${getRandomInteger(10000, 100000)}`),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComments)
});

export default createPicture;
