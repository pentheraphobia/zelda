var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");


var ballX = canvas.width/2;
var ballY = canvas.height-30;
var ballDx = 2;
var ballDy = -2;
var ballRadius = 25;
var ballColors = ["red","orange","yellow","green","blue","purple"];
var currentBallColor = "purple";

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;
var ballHit = 0;

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

function draw() {
 ctx.clearRect(0,0,canvas.width,canvas.height);
 drawBall();
 drawPaddle();
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

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

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

setInterval(draw,10);