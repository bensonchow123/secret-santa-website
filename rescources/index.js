function randomImage(){
  let imagesArray = ['rescources/media/face-spinning.gif', 'rescources/media/snowman.png', 'rescources/media/elves.png'];
  let num = Math.floor(Math.random() * imagesArray.length);
  let randomNum = Math.random() * (11 - 6 + 1) + 6;
  let img = document.createElement("img");
  img.src = imagesArray[num];
  img.classList.add('box2d');
  img.style.height = `${randomNum}vmin`;
  div = document.getElementById("clickme");
  div.appendChild(img)
  init()
}

function randomJoke (){
  let randomJokes = [''
                    ];
  let index = Math.floor(Math.random() * randomJokes.length);
  alert(randomJokes[index])
}

function onload() {
  alert("Merry christmas!!!");
}
