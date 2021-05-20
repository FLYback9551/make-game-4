var bg,boy,boyCol,b;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var zombie;
var score = 0;
var gameOver, restart;
var gameOverImg, restartImg;
var obstacleGroup, obstacle1, obstacle2, obstacle3;
var coinGroup, yellowcoin, bluecoin; 
var bluecoinIMG,yellowcoinIMG 
function preload(){
 bg = loadImage("images/bg.png");
 
yellowcoinIMG = loadImage("images/yellow coin.png");
bluecoinIMG = loadImage("images/blue coin.png");
 boy = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png","images/boy7.png");
 boyCol = loadAnimation("images/boy1.png");
 zombie = loadAnimation("images/zombie1.png","images/zombie2.png","images/zombie3.png");
obstacle1 = loadImage("images/obstacle1.png");
obstacle2 = loadImage("images/obstacle2.png");
obstacle3 = loadImage("images/obstacle3.png");
gameOverImg = loadImage("images/gameoverIMG.png");
restartImg = loadImage("images/restartIMG.png");
}


function setup(){
    createCanvas(800,400);
    b = createSprite(100,100,800,200);
    b.addImage("background",bg);
    //b2 = createSprite()  
    b.velocityX = -5;
    b.scale = 3.5;
    boy1 = createSprite(200,230,200,50);
    boy1.addAnimation("boy",boy);
    boy1.addAnimation("collided",boyCol);
    zombie1 = createSprite(75,320,displayWidth,displayWidth);
    zombie1.addAnimation("zombie",zombie);
    ground = createSprite(200,380,400,10);
    ground.visible = true;
    gameOver = createSprite(300,60); 
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5
  restart = createSprite(300,150);
  restart.addImage(restartImg);
  restart.scale = 0.5

  boy1.setCollider("rectangle",0,0,boy1.width,boy1.height);
  boy1.debug = false;

    obstacleGroup = createGroup();
    coinGroup = createGroup();
}



function draw(){
background("white");



boy1.collide(ground);
    
    if(gameState === PLAY){

        gameOver.visible = false;
        restart.visible = false;
        
        
        boy1.velocityY = boy1.velocityY + 0.8;


        if (keyDown ("space")){
            boy1.velocityY = -14;
            }
        
        if (b.x <-30){
          b.x = 800;
        }
    coins();
    obstacles();
  
        if (coinGroup.isTouching(boy1)){
      score = score + 1;
      coinGroup.destroyEach();
    }
    if (obstacleGroup.isTouching(boy1)){
      gameState = END;
    }
    } 
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
       //change the trex animation
        boy1.changeAnimation("collided",boyCol );
      
       
       
        ground.velocityX = 0;
        boy1.velocityX = 0;
        b.velocityX = 0;
        
       
        //set lifetime of the game objects so that they are never destroyed
      obstacleGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
       
       obstacleGroup.setVelocityXEach(0);
       coinGroup.setVelocityXEach(0);    
     }
    
   
    //stop boy from falling down
    boy1.collide(ground);
    
    if(mousePressedOver(restart)) {
        reset();
      }
  
 drawSprites()
 stroke("red");
        textSize(30);
        fill("yellow");
        text("score-"+score,490,50);
}
function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  boy1.changeAnimation("boy",boy);
  score=0;
}
function coins(){
    
    if (frameCount % 100 === 0) {
        var bluecoin = createSprite(810,100);
        
        bluecoin.addImage(bluecoinIMG);
        bluecoin.scale = 0.4;
        bluecoin.velocityX = -3;
        
         //assign lifetime to the variable
         bluecoin.lifetime = 200;
         bluecoin.y = Math.round(random(80,120));
        
       
        
        //add each cloud to the group
        coinGroup.add(bluecoin);

      }
      
    } 
   
    
    function obstacles(){
        if (frameCount % 100 === 0){
            var obstacle = createSprite(810,330);
            obstacle.velocityX = -6;
            obstacle.depth = boy1.depth;
            boy1.depth = boy1.depth+1;

             //generate random obstacles
             var rand = Math.round(random(1,3));
             switch(rand) {
               case 1: obstacle.addImage(obstacle1);
                       break;
               case 2: obstacle.addImage(obstacle2);
                       break;
               case 3: obstacle.addImage(obstacle3);
                       break;

               default: break;
             }
             obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.width);
            obstacle.debug = false;
            
             //assign scale and lifetime to the obstacle           
             obstacle.scale = 1;
             obstacle.lifetime = 300;
            
            //add each obstacle to the group
             obstacleGroup.add(obstacle);
          }
         }
    