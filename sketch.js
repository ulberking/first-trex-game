
var trex_running , trex
var ground_image, ground
var invisible_ground
var cloud_image, cloud
var ob, ob1, ob2, ob3, ob4, ob5, ob6
var gameState = "play"
var obstacleG, cloudG
var trex_dead
var gameover, gameover_image, restart, restart_image
var score = 0
var checkpoint, die, jump
var b = "Minho"
function preload(){
 trex_dead=loadAnimation("trex_choc.png")
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
 ground_image=loadImage("ground2.png")
 cloud_image=loadImage("cloud.png")
 ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  gameover_image=loadImage("gameOver.png")
  restart_image=loadImage("restart.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
}

function setup() {
  createCanvas(600,200)
 trex=createSprite(30,167,1,1)
  trex.addAnimation("trex_walking",trex_running)
  trex.addAnimation("trex_choc",trex_dead)
  trex.scale = 0.5
  ground=createSprite(300,190,600,5)
  ground.addImage("ground_changing",ground_image)
  invisible_ground=createSprite(300,195,600,5)
  invisible_ground.visible = false
  obstacleG = createGroup();
  cloudG = createGroup(); 
  gameover=createSprite(300,100,1,1)
  gameover.addImage("gameover_text",gameover_image)
  gameover.scale = 0.75
  restart=createSprite(300,150,1,1)
  restart.addImage("restart_button",restart_image)
  restart.scale = 0.75

  
}

function draw() {
  background("white")
  text("score = "+score, 525, 15);
console.log(b)
  if(gameState == "play"){
    gameover.visible = false
    restart.visible = false
trex.changeAnimation("trex_walking",trex_running)
    if(keyDown("space") && trex.y>= 140){
  trex.velocityY = -12
      jump.play()
}
    if(frameCount%20==0){
      score = score + 1
    }
      if (ground.x < 0){
    ground.x = 1000
  } 
    ground.velocityX = -5
    trex.velocityY = trex.velocityY+ 1
    populateClouds()
    madeObstacle()
    if(trex.isTouching(obstacleG)){
      trex.velocityY = -10
      jump.play()
      //gameState = "end"
      die.play()
    }
   if(score%200==0){
      checkpoint.play()
    } 
  }
  if(gameState == "end"){
    restart.visible = true
    gameover.visible = true
    ground.velocityX = 0
    obstacleG.setVelocityXEach(0);
    cloudG.setVelocityXEach(0);
    obstacleG.setLifetimeEach(-1);
    cloudG.setLifetimeEach(-1);
    trex.velocityY = 0
    trex.changeAnimation("trex_choc",trex_dead)
    if (mousePressedOver(restart)) {
  reset()
}
  }
  trex.collide(invisible_ground)
  drawSprites()
  
 
}
function populateClouds(){
  if(frameCount%60==0){
    cloud=createSprite(650,random(20,80),1,1)
    cloud.addImage("cloud_moving",cloud_image)
     cloud.velocityX = -3
    cloud.lifetime = 240
    cloudG.add(cloud);
  }
}
function madeObstacle(){
  if(frameCount%100==0){
    ob=createSprite(700,175,10,10)
    ob.velocityX = -5
    var a = Math.round(random(0.5,6.5))
    ob.lifetime = 150
    switch(a)
    {
      case 1 : ob.addImage("ob_moving",ob1)
      break
      case 2 : ob.addImage("ob_moving",ob2)
      break
      case 3 : ob.addImage("ob_moving",ob3)
      break
      case 4 : ob.addImage("ob_moving",ob4)
        break
        case 5 : ob.addImage("ob_moving",ob5)
        break
        case 6 : ob.addImage("ob_moving",ob6)
        break
    }
        ob.scale = 0.5
        obstacleG.add(ob);
  }
}

function reset(){
  gameState = "play"
  obstacleG.destroyEach()
  cloudG.destroyEach()
  score = 0
}