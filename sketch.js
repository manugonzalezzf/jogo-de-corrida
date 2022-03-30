var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player,game;
var playerCount = 0;
var gameState = 0;
var car1,car2, car1_img,car2_img
var cars = []
var track
var allPlayers
var powerCoins, powerCoinsimg
var fuels, fuelsimg
var obstacles, obs1img,obs2img
var lifeImg
var boomimg

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");

  car1_img = loadImage("./assets/car1.png");
  car2_img = loadImage("./assets/car2.png");

  track = loadImage("./assets/PISTA.png");
  powerCoinsimg = loadImage("./assets/goldCoin.png");
  fuelsimg = loadImage("./assets/fuel.png");
  obs1img= loadImage("./assets/obstacle1.png")
  obs2img= loadImage("./assets/obstacle2.png")
  lifeImg= loadImage("./assets/life.png")
  boomimg= loadImage("./assets/blast.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);

  if (playerCount == 2 ){
    game.updateState(1)
  }
  if (gameState == 1){
    game.play()
  }
 if (gameState==2) {
   game.end()
 }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
