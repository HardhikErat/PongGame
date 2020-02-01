var computerPaddle;
var ball;
var playerPaddle
var gameState = "serve";
var computerscore = 0;
var playerscore = 0;

function setup() {

  createCanvas(800, 800);

  //create a computer paddle sp rite
  computerPaddle = createSprite(20, 400, 20, 140);
  ball = createSprite(400, 400, 20, 20);
  playerPaddle = createSprite(760, 400, 20, 140);
}

function draw() {
  //fill the computer screen with white color
  background("cyan");
  if (keyWentDown("down")) {
    playerPaddle.velocityY = 14;
  }


  if (keyWentUp("down")) {
    playerPaddle.velocityY = 0;
  }

  if (keyWentDown("up")) {
    playerPaddle.velocityY = -14;
  }


  if (keyWentUp("up")) {
    playerPaddle.velocityY = 0;
  }
  textSize(24);
  text(computerscore, 320, 40);
  text(playerscore, 480, 40);
  if (gameState === "serve") {
    textSize(24);
    text("Press Space to Serve", 300, 360);
  }
  edges = createEdgeSprites();
  computerPaddle.y = ball.y;
  ball.bounceOff(computerPaddle);
  ball.bounceOff(playerPaddle);
  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
    ball.velocityX = 10;
    ball.velocityY = 10;
  }

  for (var i = 0; i < 800; i = i + 40) {
    line(400, i, 400, i + 20);
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    //wall_hitSound.play();
  }

  if (playerPaddle.isTouching(edges[2]) || playerPaddle.isTouching(edges[3])) {
    playerPaddle.bounceOff(edges[2]);
    playerPaddle.bounceOff(edges[3]);
  }

  if (ball.x > 800 || ball.x < 0) {
    if (ball.x > 800) {
      computerscore = computerscore + 1;
    }
    if (ball.x < 0) {
      playerscore = playerscore + 1;
    }
    reset();
    gameState = "serve";
  }

  if (computerscore == 5 || playerscore == 5) {
    gameState = "over";
    playerPaddle.velocityY = 0;
    playerPaddle.x = 760;
    playerPaddle.y = 400;
    textSize(24);
    text("Press R To Restart The Game.", 250, 360);
    text("Game Over!", 330, 280);
    text("You lose! Better Luck Next Time.", 240, 320);
  }

  if (keyDown("R") && gameState == "over") {
    gameState = "serve";
    computerscore = 0;
    playerscore = 0;
  }

  function serve() {
    ball.velocityX = 6;
    ball.velocityY = 8;
  }

  function reset() {
    ball.x = 400;
    ball.y = 400;
    ball.velocityX = 0;
    ball.velocityY = 0;
  }
  drawSprites();
}