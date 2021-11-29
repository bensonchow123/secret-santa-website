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
    randomClick = Math.floor(Math.random() * (10 - 5 + 1) + 5);
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
                     'What happens if you eat Christmas decorations? You get tinsel-it is',
                     'What do snowmen wear on their heads? Ice caps!',
                     'What did Adam say the day before Christmas? “It’s Christmas, Eve!”',
                     'What do you get when you cross a snowman with a vampire? Frostbite!',
                     'What did the stamp say to the Christmas card? Stick with me and we’ll go places!',
                     'Why did no one bid for Rudolph and Blitzen on eBay? Because they were two deer!',
                     'What does the Queen call her Christmas Broadcast? The One Show!',
                     'Why don’t you ever see Santa in hospital? Because he has private elf care!',
                     'How did Mary and Joseph know Jesus’ weight when he was born? They had a weigh in a manger!',
                     'Why is it getting harder to buy Advent calendars? Their days are numbered!',
                     'How did Scrooge win the football game? The ghost of Christmas passed!',
                     'What do angry mice send to each other at Christmas? Cross-mouse cards!',
                     'What do you call a bunch of chess players bragging about their games in a hotel lobby? Chess nuts boasting in an open foyer!'
                    ];
  
  let index = Math.floor(Math.random() * randomJokes.length);
  popup.innerHTML = randomJokes[index];
  popup.classList.toggle("show");
}
