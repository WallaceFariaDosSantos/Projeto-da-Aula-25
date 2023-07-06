const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, player2, playerBase, playerBase2, playerArcher, playerMage;
var playerArrows = [];
var playerMagic = [];
var board1, board2;
var numberOfArrows = 20;
var numberOfMana = 200;

function preload() {
  backgroundImg = loadImage("./assets/background.jpeg");
}

function setup() {
  canvas = createCanvas(2000, 1200);

  engine = Engine.create();
  world = engine.world;

  //steve
  playerBase = new PlayerBase(300, 500, 250, 250);
  player = new Player(310, playerBase.body.position.y -100, 400, 230);
  playerArcher = new PlayerArcher(350, playerBase.body.position.y -125, 400, 230);

  //mago
  playerBase2 = new PlayerBase(300, 1100, 250, 250);
  player2 = new Player2(310, playerBase2.body.position.y -100, 400, 230);
  playerMage = new PlayerMage(360, playerBase2.body.position.y -120, 300, 150);

  //alvos
  board1 = new Board(width -300, 330, 60, 200);
  board2 = new Board(width -300, height -300, 60, 200);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  playerBase2.display();
  player.display();
  player2.display();
  playerArcher.display();
  playerMage.display();

  board1.display();
  board2.display();

  for(var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
    }
  }

  for(var p = 0; p < playerMagic.length; p++) {
    if (playerMagic[p] !== undefined) {
      playerMagic[p].display();
    }
  }

  // Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("ARQUEIRO E MAGO ÉPICOS", width / 2, 100);

  //Contagem de Flechas e Mana
  fill("red");
  textAlign("center");
  textSize(30);
  text("Flechas Restantes: " + numberOfArrows, 200, 100);

  fill("SkyBlue");
  textAlign("center");
  textSize(30);
  text("Mana Restante: " + numberOfMana, 200, 150);
}

function keyPressed(){
  if(keyCode === 69){
    if (numberOfArrows > 0){
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX+35, posY, 90, 60, angle);

      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyPressed2(){
  if(keyCode === 81){
    if(numberOfMana > 0){
      var posX = playerMage.body.position.x;
      var posY = playerMage.body.position.y;
      var angle = playerMage.body.angle;

      var magic = new PlayerMagic(posX+65, posY-10, 55, 55, angle);

      Matter.Body.setAngle(magic.body, angle);
      playerMagic.push(magic);
      numberOfMana -= 10;
    }
  }
}

function keyReleased(){
  if(keyCode === 69){
    if(playerArrows.length){
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length -1].shoot(angle);
    }
  }
}

function keyReleased2(){
  if(keyCode === 81){
    if(playerMagic.length){
      var angle = playerMage.body.angle;
      playerMagic[playerMagic.length -1].shoot(angle);
    }
  }
}
