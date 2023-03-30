const sides = document.querySelectorAll(".side");
const canvases = document.querySelectorAll("canvas");
const logoSize = 60;

sides.forEach((side) => {
  const canvas = side.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  let hue = Math.floor(Math.random() * 360);

  canvas.width = 400;
  canvas.height = 400;

  const logo = new Image();
  logo.src = "../assets/logo.png";
  logo.height = logoSize;
  logo.width = logoSize;
  ctx.filter = `invert(89%) sepia(24%) saturate(425%) hue-rotate(${hue}deg) brightness(96%) contrast(90%)`;

  let x = canvas.width / 2 - logoSize / 2;
  let y = canvas.height / 2 - logoSize / 2;
  let velocityX = Math.random() * 10 - 5;
  let velocityY = Math.random() * 10 - 5;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(logo, x, y, logoSize, logoSize);

    hue = Math.floor(Math.random() * 360);

    x += velocityX;
    y += velocityY;

    if (x + logoSize >= canvas.width || x <= 0) {
      velocityX = -velocityX;
      x = x + velocityX;
      hue = Math.floor(Math.random() * 360);
      ctx.filter = `invert(89%) sepia(24%) saturate(425%) hue-rotate(${hue}deg) brightness(96%) contrast(90%)`;
    }
    if (y + logoSize >= canvas.height || y <= 0) {
      velocityY = -velocityY;
      y = y + velocityY;
      hue = Math.floor(Math.random() * 360);
      ctx.filter = `invert(89%) sepia(24%) saturate(425%) hue-rotate(${hue}deg) brightness(96%) contrast(90%)`;
    }

    requestAnimationFrame(draw);
  };

  logo.onload = () => {
    draw();
  };
});

let angleX = 30;
let angleY = 30;
const updateCube = () => {
  angleX += 0.2;
  angleY += 0.2;
  document.querySelector(
    ".cube"
  ).style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  requestAnimationFrame(updateCube);
};
requestAnimationFrame(updateCube);
