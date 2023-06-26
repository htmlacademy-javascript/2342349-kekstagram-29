const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
      ? messagePool[getRandomInteger(0, messagePool.length - 1)] + ' ' + messagePool[getRandomInteger(0, messagePool.length - 1)]
      : messagePool[getRandomInteger(0, messagePool.length - 1)],
  name: namePool[getRandomInteger(0, namePool.length - 1)]
});

const createPictureObj = (_, index) => ({
  id: index + 1,
  url: 'photos/' + (index + 1) + '.jpg',
  description: (`_description_text_${getRandomInteger(10000, 100000)}`).repeat(3),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComments)
});

const pictureArray = Array.from({length: 25}, createPictureObj);
console.log(JSON.stringify(pictureArray, null, 2));


// Структура каждого объекта должна быть следующей:
//   id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
//   url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
//   description, строка — описание фотографии. Описание придумайте самостоятельно.
//   likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
//   comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30.
// Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
//
// {
//   id: 135,
//     avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }
// У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.
//   Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
//   Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
//
//   Всё отлично!
//   В целом всё неплохо. Но не всё.
//   Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
//   Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
//   Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
//   Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
//   Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
