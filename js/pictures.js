//Пустой массив, куда мы будем складывать все обьекты в виде блоков с картинками
var pictures = [],
    //Массив комментариев для блоков с картинкой
    comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '];


//Генерирование рандомного целого числа в промежутке меж min и max. Возвращает число
var randomInteger = function(min, max) {

    var rand = min + Math.random() * (max + 1 - min);

    rand = Math.floor(rand);

    return rand;

};


//Генерирование рандомного/рандомных комментов (min,max). Возвращает массив
var randomComments = function (min,max) {

    //по классике сюда все комменты складываем
    var commentsArr = [],
        //Эта переменная нужна для цикла (чтобы мы знали сколько нам нужным рандомных комментов без повторений вернуть)
        randomNum = randomInteger(min,max),
        comment;


    for ( var i = 0; i < randomNum; i++ ) {

        //тут мы берем рандомный елемент из массива
        comment = comments[Math.floor( Math.random() * comments.length )];

        //чтобы не было повторений, добавляем в нужный нам массив только уникальные комменты
        if ( commentsArr.indexOf(comment) === -1 ) {

            commentsArr.push(comment);

        }

    }

    return commentsArr;

};


//Генерирование обьектов для блоков с картинками. quantity - количество генерирукмых обьектов
var generatePictures = function (quantity) {

   for ( var i =0; i < quantity; i++ ) {

       //Прибавляем к counter 1, чтобы это значение можно было вставить в ключ url обьекта picture (счетчик (вместо 'photos/0.jpg' будет 'photos/1.jpg' и т.д
       var counter = i + 1,
           //Колиечество лайков
           pictureLikes = randomInteger(15,200),
           //Массив комментов
           pictureComments = randomComments(1,2),
           //Сам обьект, который мы будем пушить в массив
           picture = {
                url: 'photos/' + counter + '.jpg',
                likes: pictureLikes,
                comments: pictureComments

           };

       pictures.push(picture);

   }

};

generatePictures(26);


//Отрисовка одного блока с картинкой (потом будем прокидывать его в цикле)
var renderPicture = function (element) {

    //Одно из требований ТЗ - использование в верстке темплейта блока с картинкой для шаблонизации
    var pictureTemplate = document.querySelector('#picture-template').content,
        //Глубоко клонируем темплейт блока с картинком для сообственного использования
        picture = pictureTemplate.cloneNode(true);

        picture.querySelector('img').src = element.url;

        picture.querySelector('.picture-likes').textContent = element.likes;

        picture.querySelector('.picture-comments').textContent = element.comments.length;

    return picture;

};


//Отрисовка всех блоков с картинкой
var renderPictures = function () {

    //Одно из требований ТЗ - использование DocumentFragment, куда можна складывать все генерируемые блоки для последующей их вставки в нужный нам елемент/
    var fragment = document.createDocumentFragment(),
        //Куда будем складывать все картинки
        picturesOutput = document.querySelector('.pictures');

    for ( var i = 0; i < pictures.length; i++ ) {

        fragment.appendChild( renderPicture( pictures[i] ) );

    }

    return picturesOutput.appendChild(fragment);

};

renderPictures();


//Отрисовка "попапа" с блоком с картинкой
var renderGaleryOverlay = function () {

    //сам "попап"
    var galleryOverlay = document.querySelector('.gallery-overlay'),
        //Получаем первый блок с картинкой
        firstPicture = pictures[0];

    galleryOverlay.classList.remove('hidden');

    galleryOverlay.querySelector('.gallery-overlay-image').src = firstPicture.url;

    galleryOverlay.querySelector('.likes-count').textContent = firstPicture.likes;

    galleryOverlay.querySelector('.comments-count').textContent = firstPicture.comments.length;

    return galleryOverlay;

};

renderGaleryOverlay();