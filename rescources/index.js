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

function onload() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  
  else if (Notification.permission === "granted") {
    var notification = new Notification("Merry christmas!");
  }
  
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Merry christmas!");
      }
    });
  }
}
