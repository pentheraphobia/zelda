var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var ballX = Math.floor(Math.random()*(canvas.width-200))+100;
var ballY = canvas.height-30;
var ballDx = Math.floor(Math.random()*2)*4-2;
var ballDy = -2;
var ballRadius = 10;
var ballColors = ["red","orange","yellow","green","blue","purple"];
var currentBallColor = "purple";

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;
var ballHit = 0;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
 bricks[c] = [];
 for(r=0; r<brickRowCount; r++) {
  bricks[c][r] = { x: 0, y: 0 , status: 1 };
 }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);


function keyDownHandler(e) {
 if (e.keyCode == 39) {
  rightPressed = true;
 }
 else if (e.keyCode == 37) {
  leftPressed = true;
 }
}

function keyUpHandler(e) {
 if (e.keyCode == 39) {
  rightPressed = false;
 }
 else if (e.keyCode == 37) {
  leftPressed = false;
 }
}

function mouseMoveHandler(e) {
 var relativeX = e.clientX - canvas.offsetLeft;
 if (relativeX > 0 && relativeX < canvas.width) {
  paddleX = relativeX - paddleWidth/2;
 }
}

function drawBall() {
 ctx.beginPath();
 ctx.arc(ballX,ballY,ballRadius,0,Math.PI*2);
 ctx.fillStyle = currentBallColor;
 ctx.fill();
 ctx.closePath();
}

function drawPaddle() {
 ctx.beginPath();
 ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
 ctx.fillStyle = "#000000";
 ctx.fill();
 ctx.closePath();
}

function drawBricks() {
 for(c=0; c<brickColumnCount; c++) {
  for(r=0; r<brickRowCount; r++) {
   if(bricks[c][r].status == 1) {
    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
    bricks[c][r].x = brickX;
    bricks[c][r].y = brickY;
    ctx.beginPath();
    ctx.rect(brickX,brickY,brickWidth,brickHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
   }
  }
 }
}

function collisionDetection() {
 for(c=0; c<brickColumnCount; c++) {
  for(r=0; r<brickRowCount; r++) {
   var b = bricks[c][r];
   if(b.status == 1) {
    if(ballX > b.x && ballX < b.x+brickWidth && ballY > b.y && ballY < b.y+brickHeight) {
     ballDy = -ballDy;
     b.status = 0;
     score++;
     if (ballDx > 0) {ballDx+=0.2} else {ballDx-=0.2};
     if (ballDy > 0) {ballDy+=0.2} else {ballDy-=0.2};
    }
   }
  }
 }
}

function drawScore() {
 ctx.font = "16px Arial";
 ctx.fillStyle = "#800080";
 ctx.fillText("Score: "+score,8,20);
}

function draw() {
 ctx.clearRect(0,0,canvas.width,canvas.height);
 drawBricks();
 drawBall();
 drawPaddle();
 collisionDetection();
 drawScore();
 if (ballY + ballDy < ballRadius) {
  ballDy = -ballDy;
  currentBallColor = ballColors[Math.floor(Math.random() * 6)];
 }
 else if (ballY + ballDy > canvas.height-ballRadius) {
  if (ballX > paddleX && ballX < paddleX + paddleWidth) {
   ballDy = -ballDy;
   ballHit += 35;
  }
  else if (ballY + ballDy < canvas.width-ballRadius) {
   ballDy = -ballDy;
  }
 }
 if (ballX + ballDx < ballRadius || ballX + ballDx > canvas.width-ballRadius) {
  ballDx = -ballDx;
  currentBallColor = ballColors[Math.floor(Math.random() * 6)];
 }
 ballX += ballDx;
 ballY += ballDy;
 if (rightPressed && paddleX < canvas.width-paddleWidth) {
  paddleX += 7;
 }
 else if(leftPressed && paddleX > 0) {
  paddleX -= 7;
 }
 if (ballHit > 0) {
  currentBallColor = ballColors[Math.floor(Math.random() * 6)];
  ballHit -= 1;
 }
}

setInterval(draw,10);