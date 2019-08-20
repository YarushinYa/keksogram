var MAX_SCALE = 100;
var MIN_SCALE = 25;
var SCALE_STEP = 25;
var INITIAL_EFFECT = "img-upload__preview"
var names = [
  "Саша",
  "Алексей",
  "Артем",
  "Jhon",
  "Viktor",
  "Jane",
  "Anna"
]
var comments = [
  "Всё	отлично!" ,
  "В	целом	всё	неплохо.	Но	не	всё.",
  "Когда	вы	делаете	фотографию,	хорошо	бы	убирать	палец	из	кадра. В	конце	концов	это	просто	непрофессионально. ",
  "Моя	бабушка	случайно	чихнула	с	фотоаппаратом	в	руках	и	у	неё получилась	фотография	лучше.",
  "Я	поскользнулся	на	банановой	кожуре	и	уронил	фотоаппарат	на	кота и	у	меня	получилась	фотография	лучше. ",
  "Лица	у	людей	на	фотке	перекошены,	как	будто	их	избивают.	Как	можно было	поймать	такой	неудачный	момент?!"
];

var picturesElement = document.querySelector(".pictures")
var getRandomItem = function(array){
  var randomIndex = getRandomInt(0, array.length-1)
  return array[randomIndex]
}

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var currentScale = 100;
var effectButton = document.querySelector('.img-upload__effects');
var imgUploadScaleValue = document.querySelector('.scale__control--value');
var imgPreview = document.querySelector('.img-upload__preview');
var imgUploadScaleSmaller = document.querySelector('.scale__control--smaller');
var imgUploadScaleBigger = document.querySelector('.scale__control--bigger');
var levelPin = document.querySelector('.effect-level__pin');
var uploadFormElement = document.querySelector('.img-upload__form');
var uploadCancel = document.querySelector('#upload-cancel');
var imgUpload = document.querySelector('.img-upload__overlay');
var uploadFileButton = document.querySelector('#upload-file');
var bigPictureElement = document.querySelector('.big-picture');
var commentTemplate = document.querySelector('#comments')
    .content
    .querySelector('.social__comment');
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  // Вывод изображений на экран //
var createComment = function(){
  var comment =
    {
      avatar:	"img/avatar-"+ getRandomInt(1, 6) +".svg",
      message:	getRandomItem(comments),
      name: getRandomItem(names)
    };
  return comment
}
var generateComments = function(count){
  var array = [];
  for (var i=0; i < count; i++) {
    array.push(createComment())
  }
  return array
}
var createPhotoObject = function(number) {

 var picture = {
    url: "photos/"+ number + ".jpg",
    likes: getRandomInt(15, 200),
    comments: generateComments(getRandomInt(1, 10)),
  };
  return picture;
}
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
}
var renderPictures = function(array){
  var fragment = document.createDocumentFragment();
  for(var i=0; i<array.length; i++){
    fragment.appendChild(renderPicture(array[i]))
  }
  picturesElement.appendChild(fragment)
}
var renderComment = function(comment){
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
}
var renderBigPicture = function(picture){
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;

  var fragment = document.createDocumentFragment();
  for(var i=0; i<picture.comments.length; i++){
    fragment.appendChild(renderComment(picture.comments[i]))
  }
  var socialComments = bigPictureElement.querySelector('.social__comments')
  socialComments.innerHTML = '';
  socialComments.appendChild(fragment)
  return bigPictureElement;
}

var generateData = function(count) {
  var array = [];
  for (var i=0; i < count; i++) {
    array.push(createPhotoObject(i+1));
  }
  return array;

}
var showUploadWindow = function(){
  imgUpload.classList.remove("hidden");
  setImageScale(100);
};
var closeUploadWindow = function(){
  imgUpload.classList.add("hidden");
  uploadFormElement.reset();
};
var scaleBiggerButton = function(){
  if (currentScale >= MAX_SCALE){
    return
  }
  setImageScale(currentScale + SCALE_STEP);
}
var setImageScale = function(value) {
  currentScale = value;
  imgPreview.style.transform = "scale(" + value/100 + ")";
  imgUploadScaleValue.value = value + "%";
}
var scaleSmallerButton = function(){
  if (currentScale <= MIN_SCALE) {
    return
  }
  setImageScale(currentScale - SCALE_STEP);

};
// var changeImageEffect = function(){

// };

uploadFileButton.addEventListener('change', function(){
  showUploadWindow()
});
uploadCancel.addEventListener('click', function(){
  closeUploadWindow()
});
levelPin.addEventListener('mouseup', function(){
});
imgUploadScaleSmaller.addEventListener('click', function(){
  scaleSmallerButton();
});
imgUploadScaleBigger.addEventListener('click', function(){
  scaleBiggerButton();
});
effectButton.addEventListener('change', function(){
  if(imgPreview.classList = INITIAL_EFFECT){
  var activeEffectElement = effectButton.querySelector(".effects__radio:checked");

  imgPreview.classList.add('effects__preview--' + activeEffectElement.value );
  }
  else{
    imgPreview.classList.remove('effects__preview--' + activeEffectElement.value );
  }
});
//var bigPictureTemplate = document.querySelector(".big-picture").classList.remove("hidden");
document.querySelector(".social__comment-count").classList.add("visually-hidden");
document.querySelector(".comments-loader").classList.add("visually-hidden");
var data = generateData(25);
renderPictures(data)
renderBigPicture(data[0])
