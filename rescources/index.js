function addFace() {
  var img = document.createElement("img");
  img.src = "rescources/media/face-spinning.gif";
  img.classList.add('box2d');
  img.setAttribute("id", "smallFace");
  div = document.getElementById("top");
  div.appendChild(img)
  init()
}
