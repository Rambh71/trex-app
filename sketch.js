var trex,trexR,C1,C2,C3,C4,C5,C6, trexD;
var ground,groundI,ground2,CloudK,score=0,cactus;
var play=1,end=2,gamestate=play,cloudA,cactusB;
var restartR,gameOverO,restart,gameOver;
var die,jump,check;
function preload(){
  trexR=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundI=loadImage("ground2.png")
  CloudK=loadImage("cloud.png")
  C1=loadImage("obstacle1.png")
  C2=loadImage("obstacle2.png")
  C3=loadImage("obstacle3.png")
  C4=loadImage("obstacle4.png") 
  C5=loadImage("obstacle5.png")
  C6=loadImage("obstacle6.png")
  trexD=loadAnimation("trex_collided.png")
  restartR=loadImage("restart.png")
  gameOverO=loadImage("gameOver.png")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  check=loadSound("checkPoint.mp3")
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  trex=createSprite(50,height-50,40,20);
 trex.addAnimation("Ab", trexR) ;
  trex.scale=0.5;
  trex.addAnimation("gh",trexD);
  
 ground=createSprite(width/2,height-50,width,10)
  ground.addImage(groundI)
 
  
  ground2=createSprite(width/2,height-40,width,10)
  ground2.visible=false
  trex.debug=false
 trex.setCollider("rectangle",0,0,100,trex.height) 
  
  cloudA= new Group();
  cactusB=new Group();
  
  restart=createSprite(width/2,height/2,10,10)
  restart.addImage(restartR)
  restart.scale=0.3;
  
  gameOver=createSprite(width/2,height/2,5,5)
  gameOver.addImage(gameOverO)
  gameOver.scale=0.5;
  
}


function draw(){
  background("black")
   ground.velocityX=-(5+score/100)
  if (gamestate ===play ){
    score=score+Math.round(getFrameRate()/60)
   if(ground.x<0){
    ground.x=ground.width/2
     
  }
  if((touches.length>0||keyDown("space"))&& trex.y>height-60) {
  trex.velocityY=-10
    jump.play();
    touches=[];
}   
 
 trex.velocityY= trex.velocityY+0.5   
  spawnClouds();
  spawnCactus();
    gameOver.visible=false;
    restart.visible=false;
    if(score >0 && score %100 ===0){
      check.play();
    }    
    
    
    if(trex.isTouching(cactusB)){
     gamestate=end 
      die.play();
    }
    
    
  }
  if(gamestate ===end){
    trex.velocityY=0
    ground.velocityX=0
    cactusB.setVelocityXEach(0)
    cloudA.setVelocityXEach(0)
    trex.changeAnimation("gh",trexD)
    cloudA.setLifetimeEach(-1)
    cactusB.setLifetimeEach(-1)
    
    gameOver.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)||touches.length>0){
      reset();
      touches=[]; 
       }
  }
  
  text("score="+score,width-150,20)
  
  
  

  trex.collide(ground2)
  
 
  drawSprites();
}

function reset(){
  gamestate = play 
   gameOver.visible=false;
    restart.visible=false;
  score=0;
  trex.changeAnimation("Ab", trexR);
  cloudA.destroyEach();
  cactusB.destroyEach();
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width,Math.round(random(10,height/2)),40,10);
    cloud.addImage(CloudK)
    cloud.velocityX = -3;
    cloud.scale= 0.5;
    cloud.depth= trex.depth;
    trex.depth=trex.depth+1;
    cloud.lifetime=width/2;
    cloudA.add(cloud)
  }
}
function spawnCactus(){
  if(frameCount % 80 === 0){
    cactus=createSprite(width,height-60,10,30)
    cactus.velocityX= -(5+score/100);
    cactus.scale= 0.7;
    cactus.lifetime=width/2;
    cactusB.add(cactus)
   var a =Math.round(random(1,6)); 
    
  switch(a) {
    case 1: cactus.addImage(C1);
      break;
       case 2: cactus.addImage(C2);
      break;
       case 3: cactus.addImage(C3);
      break;
       case 4: cactus.addImage(C4);
      break;
       case 5: cactus.addImage(C5);
      break;
       case 6: cactus.addImage(C6);
      break;
      default : break ;
  } 
    
    
  }
}