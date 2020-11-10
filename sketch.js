var monkey, monkey_running;
var ground, invisibleGround, groundImage;

var BananaGroup, BananaImage;
var StoneGroup, StoneImage;

var SurvivalTime;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  groundImage = loadImage("jungle.jpg");
  
  BananaImage = loadImage("banana.png");
  
     StoneImage = loadImage("stone.png");     
}

function setup() {
  createCanvas(800, 400);
  
monkey = createSprite(50,330,20,50);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.09;
  
  ground = createSprite(800,180,420000,800);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -5;
  
  invisibleGround = createSprite(200,335,400,10);
  invisibleGround.visible = false;
  
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
  
  
  BananaGroup = new Group();
  StoneGroup = new Group();
  
 SurvivalTime = 0;
}

function draw() {
  background(180);
  
  if(gamestate === PLAY)
     {
  
  if(BananaGroup.isTouching(monkey))
  {
    SurvivalTime = SurvivalTime+2;
    BananaGroup.destroyEach();
  }
  text("Score: "+ SurvivalTime  , 500,50);
  
  if(keyDown("space")&& monkey.y>=150) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
       if(StoneGroup.isTouching(monkey))
   {
    gamestate = END; 
   } 
       
  monkey.collide(invisibleGround);
  spawnBananas();
  spawnStones();
  }
  
  else if(gamestate === END) {
    
      ground.velocityX = 0;
    monkey.velocityY = 0;
    StoneGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    BananaGroup.setLifetimeEach(-1);
   StoneGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the clouds
if (frameCount % 120 === 0) {
    var Banana = createSprite(600,120,40,10);
    Banana.y = Math.round(random(80,120));
    Banana.addImage(BananaImage);
     Banana.scale = 0.05;
    Banana.velocityX = -3;
    
     //assign lifetime to the variable
    Banana.lifetime = 200;
    
    //adjust the depth
    Banana.depth = monkey.depth;
    monkey .depth = monkey.depth + 1;
    
    //add each cloud to the group
    BananaGroup.add(Banana);
  }
  
}

function spawnStones() {
  if(frameCount % 200 === 0) {
    var Stone = createSprite(600,335,10,40);
    Stone.velocityX = -4;
    
    //generate random obstacles
    Stone.addImage(StoneImage);
    //assign scale and lifetime to the obstacle           
    
     Stone.scale = 0.15;
     Stone.lifetime = 300;
    //add each obstacle to the group
     StoneGroup.add( Stone);
  
    
  }
  

}