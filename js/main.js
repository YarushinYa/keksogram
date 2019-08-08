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
var getRandomItem = function(array){
  var randomIndex = getRandomInt(0, array.length-1)
  return array[randomIndex]
}

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
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

  picture = {
    url: "photos/"+ number + ".jpg",
    likes: getRandomInt(15, 200),
    comments: generateComments(getRandomInt(1, 10)),
  }
  return picture
}
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img[src]').value = picture.url;
  pictureElement.querySelector('.picture__likes').value = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
}
var generateData = function(count) {
  var array = [];
  for (var i=0; i < count; i++) {
    array.push(createPhotoObject(i+1));
  }
  return array;

}

var data = generateData(25);
console.log(data);
