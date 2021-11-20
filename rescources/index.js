function randomImage(){
  let imagesArray = ['media/face-spinning.gif', 'media/snowman.png'];
  let num = Math.floor(Math.random() * imagesArray.length);
  let randomNum = Math.random() * (11 - 6 + 1) + 6;
  let img = document.createElement("img");
  image.src = imagesArray[num];
  img.classList.add('box2d');
  image.style.height = `${randomNum}vmin`;
  div = document.getElementById("top");
  div.appendChild(img)
  init()
}
