var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");


var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 25;
var colors = ["red","orange","yellow","green","blue","purple"];
var currentColor = "purple";

function drawBall() {
 ctx.beginPath();
 ctx.arc(x,y,ballRadius,0,Math.PI*2);
 ctx.fillStyle = currentColor;
 ctx.fill();
 ctx.closePath();
}

function draw() {
 ctx.clearRect(0,0,canvas.width,canvas.height);
 drawBall();
 if (y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
  dy = -dy;
  currentColor = colors[Math.floor(Math.random() * 6)];
 }
 if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
  dx = -dx;
  currentColor = colors[Math.floor(Math.random() * 6)];
 }
 x += dx;
 y += dy;
}

setInterval(draw,10);