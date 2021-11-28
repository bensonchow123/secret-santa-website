let clickNum  = 0;
let randomClick =  Math.floor(Math.random() * (20 - 10 + 1) + 10);
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
  clickNum += 1
  if (clickNum % randomClick === 0){
    randomJoke()
    randomClick = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    clickNum = 0;
  }
}

function randomJoke() {
  let popup = document.getElementById("myPopup");
  let randomJokes = ['Why do reindeer like Beyoncé so much? She sleighs.',
                     'What reindeer game do reindeer play at sleepovers? Truth or deer.',
                     'What did Santa say when he stepped into a big puddle? It must have reindeer.',
                     'What does Rudolph want for Christmas? A Pony sleigh station.',
                     'What is Santas dogs name? Santa Paws!',
                     'Where do Santas reindeer stop for coffee? Star-bucks!',
                     'What’s every elf’s favorite type of music? Wrap!',
                     'What’s every elf’s favorite type of music? Wrap!',
                     'What happens if you eat Christmas decorations? You get tinsel-it is'
                    ];
  let index = Math.floor(Math.random() * randomJokes.length);
  popup.innerHTML = randomJokes[index];
  popup.classList.toggle("show");
}
