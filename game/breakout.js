     //Canvas variables
     var canvas = document.getElementById("canvasID");
     var cdim = canvas.getContext("2d"); //2D canvas
     //Game variables
     var score = 0;
     var level = 1;
     var bestLevel = 1;
     var lives = 3;
     //Ball variables
     var posX = canvas.width/2;
     var posY = canvas.height-30;
     var moveX = 3;
     var moveY = -3;
     var radius = 10;
     //Paddle variables
     var paddleHeight = 8;
     var paddleWidth = 60;
     var paddlePos = (canvas.width-paddleWidth)/2;
     //Key controls
     var pressedRight = false;
     var pressedLeft = false;
     //Brick variables
     var brickRows = 3;
     var brickColumns = 5;
     var brickWidth = 80;
     var brickHeight = 20;
     var bricks = []; //Store all bricks as objects in 2D array
     var padding = 10;
     var offsetTop = 30;
     var offsetLeft = 10;
     //Generate 2D brick array
     resetBricks();

     function moveMouse(m){
          var mousePos = m.clientX - canvas.offsetLeft;
          if (mousePos > 0 && mousePos < canvas.width){
               paddlePos = mousePos - paddleWidth/2;
          }
     }
     function drawBall(){
          cdim.beginPath();
          cdim.arc(posX, posY, radius, 0, Math.PI*2);
          cdim.fillStyle = "#0095DD";
          cdim.fill();
          cdim.closePath();
     }
     function drawPaddle(){
          cdim.beginPath();
          cdim.rect(paddlePos, canvas.height-paddleHeight, paddleWidth, paddleHeight);
          cdim.fillStyle = "#0095DD";
          cdim.fill();
          cdim.closePath();
     }
     function drawBricks(){
          for (var i=0; i<brickColumns;i++){
               for (var j=0; j<brickRows;j++){
                    if (bricks[i][j].isActive == true){
                         var brickX=(i*(brickWidth+padding))+offsetLeft;
                         var brickY=(j*(brickHeight+padding))+offsetTop;
                         bricks[i][j].posX = brickX;
                         bricks[i][j].posY = brickY;
                         cdim.beginPath();
                      cdim.rect(brickX, brickY, brickWidth, brickHeight);
                      //Last row is gold to signify importance
                      cdim.fillStyle = (j==0) ? "gold" : "red";
                      bricks[i][j].color = (j==0) ? "gold" : "red";
                      cdim.fill();
                      cdim.closePath();
                    }
               }
          }
     }
     //Repositions ball and paddle after new level
     function resetBallPaddle(){
          posX = canvas.width/2;
          posY = canvas.height-30;
          moveY = -3;
          moveX = 3;
          paddlePos = (canvas.width-paddleWidth)/2;
     }

     //Creates new 2D array for drawBricks() to populate
     function resetBricks(){
          for (var i=0; i<brickColumns;i++){
               bricks[i]= [];
               for (var j=0; j<brickRows;j++){
                    bricks[i][j]= {posX:0, posY:0, isActive: true, color: "red"};
               }
          }
     }

     function detectCollision(){
          for (var i=0; i<brickColumns;i++){
               for (var j=0; j<brickRows;j++){
                    var brick = bricks[i][j];
                    if (brick.isActive == true){
                         if (posX > brick.posX && posX < brick.posX+brickWidth && posY > brick.posY && posY < brick.posY+brickHeight){
                              moveY=-moveY;
                              brick.isActive = false;
                              if (brick.color == "gold"){
                                   score=score+2;
                              }
                              else{score++;}
                              //Level up functionality
                              if (score == (brickColumns*2) + ((brickRows-1)*brickColumns)){
                                   level++;
                                   //Check for best score
                                   if (level > bestLevel){
                                        bestLevel = level;
                                   }
                                   //In order to perserve game data, document.reload() is not used
                                   resetBricks();
                                   //Generate new bricks, reposition ball and paddle
                                   drawBricks();
                                   resetBallPaddle();
                                   score = 0;
                              }
                         }
                    }
               }
          }
     }
     function displayLives(){
          cdim.font = "16px Arial";
         cdim.fillStyle = "#0095DD";
         cdim.fillText("Lives: " + lives, 8, 20);
     }

     function displayScore(){
          cdim.font = "16px Arial";
         cdim.fillStyle = "#0095DD";
         cdim.fillText("Score: " + score, 100, 20);
     }
     function displayLevel(){
          cdim.font = "16px Arial";
         cdim.fillStyle = "#0095DD";
         cdim.fillText("Level: " + level, 200, 20);
     }
     function displayBestLevel(){
          cdim.font = "16px Arial";
         cdim.fillStyle = "#0095DD";
         cdim.fillText("Best level: " + bestLevel, 300, 20);
     }


     function run(){
          //Clears canvas after every call to draw to create movement effect
          cdim.clearRect(0, 0, canvas.width, canvas.height);
          drawBall();
          drawPaddle();
          drawBricks();
          detectCollision();
          displayLives();
          displayScore();
          displayLevel();
          displayBestLevel();
          //Collision control
         if(posY + moveY < radius) {
             moveY = -moveY;
         }
         if (posY + moveY > canvas.height-radius){
              //Ball is within paddle margins, plus a small range of error for better gameplay
              if (posX > paddlePos-10 && posX < paddlePos + paddleWidth+10){
                   moveY = -moveY;
              }
              else{
                   lives--;
                   if (lives == 0){
                         alert("Game over!");
                        level = 1;
                        score = 0;
                        lives = 3;
                         resetBricks();
                         drawBricks();
                         resetBallPaddle();
                   }
                   else{
                         resetBallPaddle();
                   }
                   
              }
         }
          if (posX+moveX > canvas.width-radius || posX+moveX < radius){
               moveX=-moveX;
          }
          //Paddle control
          if (pressedRight && paddlePos < canvas.width-paddleWidth){
               paddlePos +=5;
          }
          else if (pressedLeft && paddlePos > 0){
               paddlePos -=5;
          }
          posX+=moveX;
          posY+=moveY;
          requestAnimationFrame(run);
     }

     //Listening for mouse interaction from player
     document.addEventListener("mousemove", moveMouse, false);
     //Runs game functions every 10 miliseconds to update information
     alert("Ready to play?");
     run();