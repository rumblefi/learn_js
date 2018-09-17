//Массив, в который складываются все блоки с картинкой
var pictures = [],
    //Массив комментариев
    comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '];


//Генерирование рандомного целого числа в промежутке меж min и max
var randomInteger = function(min, max) {

    var rand = min + Math.random() * (max + 1 - min);

    rand = Math.floor(rand);

    return rand;

};


//Генерирование рандомного/рандомных комментов (1 или 2)
var randomComments = function () {

    var resultArr = [],
        randomNum = randomInteger(1,2),
        comment;

    for ( var i = 0; i < randomNum; i++ ) {

        comment = comments[Math.floor( Math.random() * comments.length )];

        if ( resultArr.indexOf(comment) === -1 ) {

            resultArr.push(comment);

        }

    }

    return resultArr;

};


//Генерирование блоков с картинкой
var generatePictures = function () {

   for ( var i =0; i < 26; i++ ) {

       var counter = i + 1,
           pictureLikesLength = randomInteger(15,200),
           pictureComments = randomComments(),
           picture = {

                url: 'photos/' + counter + '.jpg',
                likes: pictureLikesLength,
                comments: pictureComments

           };

       pictures.push(picture);

   }

};

generatePictures();


//Отрисовка шаблона блока с картинкой
var renderPicture = function (element) {

    //Одно из требований ТЗ - использование в верстке темплейта блока с картинкой для шаблонизации
    var pictureTemplate = document.querySelector('#picture-template').content;

    var picture = pictureTemplate.cloneNode(true);

        picture.querySelector('img').src = element.url;

        picture.querySelector('.picture-likes').src = element.likes;

        picture.querySelector('.picture-comments').src = element.comments;

    return picture;

};


//Отрисовка всех блоков с картинкой
var renderPictures = function () {

    //Одно из требований ТЗ - использование DocumentFragment, куда можна складывать все генерируемые блоки для последующей их вставки в нужный нам елемент
    var fragment = document.createDocumentFragment(),
        picturesOutput = document.querySelector('.pictures');

    for ( var i = 0; i < pictures.length; i++ ) {

        fragment.appendChild( renderPicture( pictures[i] ) );

    }

    return picturesOutput.appendChild(fragment);

};

renderPictures();


//Отрисовка "попапа" с блоком с картинкой
var renderGaleryOverlay = function () {

    var galleryOverlay = document.querySelector('.gallery-overlay'),
        firstPicture = pictures[0];

    galleryOverlay.classList.remove('hidden');

    galleryOverlay.querySelector('.gallery-overlay-image').src = firstPicture.url;

    galleryOverlay.querySelector('.likes-count').textContent = firstPicture.likes;

    galleryOverlay.querySelector('.comments-count').textContent = firstPicture.comments.length;

    return galleryOverlay;

};

renderGaleryOverlay();