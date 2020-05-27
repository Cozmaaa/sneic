/*jshint esversion:9*/
/*jshint -W093*/
const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style = "position:absolute; left: 50%; width: 400px; margin-left: -200px;";

canvas.width = canvas.height = 400;

let FR = 10;
const S = 20;
const T = canvas.width / S;

let pos, vel, food, snake;
mergeDreapta = false;
mergeStanga = false;
mergeSus = false;
mergeJos = false;
let snakeInit = 0;
snake = [
  { x: 8, y: 10 },
  { x: 9, y: 10 },
  { x: 10, y: 10 },
];
vel = { x: 0, y: 0 };
snakeInit = snake;
function init() {
  pos = { x: 10, y: 10 };
  vel = { x: 0, y: 0 };
  snake = [
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 },
  ];


  randomFood();
}
function dificultatePlus(){
  FR+=2;
  clearInterval(intervalId);

}
function dificultateMinus(){
  FR-=2;
}

init();
function randomFood() {
  food = {
    x: Math.floor(Math.random() * T),
    y: Math.floor(Math.random() * T),
  };
  for (let cell of snake) {
    if (cell.x === food.x && food.y === cell.y) {
      return randomFood();
    }
  }
}
velInit={x:0,y:0};
document.addEventListener('keydown', keydown);

function keydown(e) {
  switch (e.keyCode) {
    case 37:
    case 65: {
      if (mergeDreapta) {
        break;
      }
      else if (JSON.stringify(vel)==JSON.stringify(velInit)) {

        break;
      }
      else {
        mergeStanga = true;
        mergeJos = false;
        mergeDreapta = false;
        mergeSus = false;
        return vel = { x: -1, y: 0 };

      }
    break;}
    case 38:
    case 87: {
      if (mergeJos) {
        break;
      }
      else {
        mergeJos = false;
        mergeStanga = false;
        mergeDreapta = false;
        mergeSus = true;
        return vel = { x: 0, y: -1 };
      }
    break;}
    case 39:
    case 68: {
      if (mergeStanga) {
        break;
      }
      else {
        mergeDreapta = true;
        mergeJos = false;
        mergeStanga = false;
        mergeSus = false;
        return vel = { x: 1, y: 0 };
      }
    break;}
    case 40:
    case 83: {
      if (mergeSus) {
        break;
      }
      else {
        mergeSus = false;
        mergeDreapta = false;
        mergeJos = true;
        mergeStanga = false;
        return vel = { x: 0, y: 1 };
      }
    }
  }
}

  intervalId=  setInterval(() => {
      requestAnimationFrame(gameLoop);
    }, 1000 / FR);




function gameLoop() {
  console.log(FR);
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById('scor').innerHTML="  Score: "+snake.length;
  document.getElementById('nivelDificultate').innerHTML="Nivel de viteza: "+FR;
//Colorarea sarpelui + miscarile lui
  ctx.fillStyle = SNAKE_COLOUR;
  for (let cell of snake) {
    ctx.fillRect(cell.x * S, cell.y * S, S, S);
  }

  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(food.x * S, food.y * S, S, S);

  pos.x += vel.x;
  pos.y += vel.y;
//Daca loveste peretele
  if (pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > T) {
    init();
  }

  if (food.x === pos.x && food.y === pos.y) {
    snake.push({ ...pos });
    pos.x += vel.x;
    pos.y += vel.y;
    randomFood();
  }
  if (vel.x || vel.y) {
    for (let cell of snake) {
      if (cell.x === pos.x && cell.y === pos.y) {
        return init();
      }
    }
    //push adauga un termen la sfarsitul arrayului si shift taie primu terment
    snake.push({ ...pos });
    snake.shift();
  }
}