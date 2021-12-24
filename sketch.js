var player1;
var island, bullet, ground, islandGroup;
var player2Img,islandImage, bg, bgImage, explode, explodeImage ;
var bullet, bulletImg, bulletGroup, invsableGround, left, right, cloudsGroup, cloud;
var score = 0, frames, z = 0, a = 0;
var c1, c2, c3;
var xp, xpImage, xpGroup, random1 = 245;

var invisibleground, center, endImage, energyCount = 9;
var gameState = "notStarted";
var islandGroup;
function preload() {
  endImage = loadImage("gameOver.png");
  
  explodeImage = loadImage("Explosion.png")
  bgImage = loadImage("bg.png")
  islandImage1 = loadImage("island_1.png")
  islandImage2= loadImage("island_2.png")
  islandImage3 = loadImage("island_3.png")
  bulletImg = loadImage("bom.png")
  left = loadImage("left.png")
  right = loadImage("right.png")
  cloudImage1 = loadImage("Cloud_1.png")
  cloudImage2 = loadImage("Cloud_2.png")
  cloudImage3 = loadImage("Cloud_3.png")
  xpImage = loadImage("energy.png")
}

function setup() {
  createCanvas(600,800);
 invisibleground=createSprite(300,800,800,1);
 invisibleground.visible= true;
 random1 = Math.round(random(230,270));

  bg = createSprite(300,400);
  bg.addImage(bgImage);
  bg.velocityY = 3;
  bg.scale = 3;

  center = createSprite(300,400,1,1);
  invisibleground.visible= true;
  
  
  
  var player1_options = {
    isStatic: true
  }
  player1 = createSprite(280,700,20,20,player1_options);
  player1.shapeColor = "yellow";
  player1.addImage(right);


  cloudsGroup = createGroup();
  bulletGroup = createGroup();
  islandGroup = createGroup();
  xpGroup = createGroup();

  score = 0;

  
  
}

function draw() {
  
  background(0);
  player1.depth = player1.depth +1;
 


 
 if(gameState === "play") {

  

  score = score + Math.round(getFrameRate()/60);

  if(player1.collide(invisibleground)) {
    gameState = "end";
  }
 }

 if(player1.collide(xpGroup)) {
   if(gameState != "notStarted" && gameState != "end") {
   score = score + 50;
   }
   xpGroup.destroyEach();
}

  if (player1.x > 600) {
    player1.x = 10;
  }

  if ( player1.x < 0) {
    player1.x = 590;
  }
 




  


  
  if(gameState === "end") {
    center.addImage(endImage);
    xpGroup.setVelocityYEach(0);
    islandGroup.setVelocityYEach(0);
    bulletGroup.setVelocityYEach(0);
    cloudsGroup.setVelocityYEach(0);
    islandGroup.depth = center.depth;
    center.depth = center.depth + 100;
    bg.velocityY = 0;
    energyCount = 0;
    player1.velocityX = 0;


  }
if(gameState != "notStarted" && gameState != "end") {
  if(player1.collide(islandGroup)){
    player1.velocityY=0;
    energyCount = 5;
}
}

  
  if (bg.y > 600) {
    bg.y = 500;
  }

  

  if(bullet > length) {
    bulletGroup.destroyEach()
  }

  if(island > length) {
    islandsGroup.destroyEach()
  }

  if(cloud > length) {
    cloudsGroup.destroyEach()
  }

  if(xp > length) {
    xpGroup.destroyEach()
  }

  player1.velocityY=player1.velocityY+0.8;


    
    

   

if(gameState != "notStarted") {
  if(player1.collide(bulletGroup)) {
    player1.depth = player1.depth +1;
    gameState = "end";
    energyCount = 0;
    explode = createSprite(0,0,0,0);
    explode.y = player1.y;
    explode.x = player1.x;
    explode.addImage(explodeImage);
    bulletGroup.destroyEach();
  }
}
 


    if(gameState === "notStarted") {
    player1.collide(invisibleground)
    }

  
  shootBullet();
  islands();
  drawSprites();
  spawnClouds();
  spawnXp()
  textSize(20);
  stroke("black");
  text("Score: " + score, 10,35);
  text("Jumps: " + energyCount, 10, 65);
}



function islands() {
if(gameState != 'end') {
  if (frameCount % 70 === 0) {
  island = createSprite(0,0,0,0);
  island.velocityY = 4;

  var rand = Math.round(random(1,3));
  switch(rand) {
    case 1: island.addImage(islandImage1);
            break;
    case 2: island.addImage(islandImage2);
            break;
    case 3: island.addImage(islandImage3);
            break;
    default: break;
  }

  islandGroup.add(island);
  island.y = Math.round(random(1,10));
  island.x = Math.round(random(150,450));
  player1.depth = player1.depth + 1;

  }

  }
}
function keyPressed() {
  if(gameState != "end") {
  if (keyIsDown(LEFT_ARROW)) {
    player1.velocityX = -5;
    player1.addImage(left);
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player1.velocityX = 5;
    player1.addImage(right);
  }

  else if (keyIsDown(DOWN_ARROW)) {
    player1.velocityX = 0;
  }

  else if(keyIsDown(UP_ARROW) && player1.y >=100 && energyCount >= 1){
    player1.velocityY = -10;
    energyCount = energyCount -1;
    gameState = "play";
    }
  }
}

function shootBullet(){
if(gameState != "end") {
  if(frameCount % 50 === 0){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y = Math.round(random(1,10));
  bullet.x = Math.round(random(70,455));
  bullet.addImage(bulletImg)
  bullet.velocityY= 7
  bulletGroup.add(bullet)
}
}
}


function spawnXp(){
  if(gameState != "end" && gameState != "notStarted") {
    if(frameCount % random1 === 0){
    xp = createSprite(0, 0, 0, 0)
    xp.y = Math.round(random(1,10));
    xp.x = Math.round(random(70,455));
    xp.addImage(xpImage)
    xp.velocityY= 7
    xpGroup.add(xp)
  }
  }
  }

function spawnClouds() {
  if(gameState != 'end') {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(1,10));
    cloud.x = Math.round(random(70,455));

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: cloud.addImage(cloudImage1);
              break;
      case 2: cloud.addImage(cloudImage2);
              break;
      case 3: cloud.addImage(cloudImage3);
              break;
      default: break;
    }

    cloud.velocityY = 3;
    
    
    cloudsGroup.depth = player1.depth;
    player1.depth = player1.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}
}