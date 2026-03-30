//board
let board;
let boardwidth = 750;
let boardheight = 250;
let context;

//player
let playerWidth = 88;
let playerHeight = 94;
let playerX = 50;
let playerY = boardheight - playerHeight;
let playerImg;

let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
}

//obstacle
let obstacleArray = [];

let obstacle1Width = 34;
let obstacle2Width = 69;
let obstacle3Width = 102;

let obstacle1Height = 70;
let obstacleX = 700;
let obstacleY = boardheight - playerHeight;

let player1Img;
let player2Img;
let player3Img;

//phsyics
let velocityX = -8; //obstacle moving speed
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = this.document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;

    context = board.getContext("2d") //used for drawing on the board

    // //draw initial player
    // context.fillStyle="green";
    // context.fillRect(player.x, player.y, player.width, player.height);

    playerImg = new Image();
    playerImg.src ="";
    playerImg.onload = function(){
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }

    obstacle1Img = new Image();
    obstacle1Img.src = "";

    obstacle2Img = new Image();
    obstacle2Img.src = "";

    obstacle3Img = new Image();
    obstacle3Img.src = "";
    
    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000) //1000 milisec = 1 second
    document.addEventListener("keydown", movePlayer)
}

function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    //player
    velocityY += gravity;
    player.y = Math.min(player.y + velocityY, playerY); //apply gravity to current player.y, making sure it doesnt exceed the ground
    context.drawImage(playerImg, player.x, player.y, player.width, player.height);

    //obstacle
    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (detectCollision(player, obstacle)) {
            gameOver = true,
            // playerImg.src = player-kalah.svg;
            playerImg.onload = function(){
                context.drawImage(player.img, player.x, player.y, player.width, player.height);
            }
        }
    }

    //score
    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function movePlayer(e){
    if (gameOver){
        return;
    }

    if((e.code =="Space" || e.code == "ArrowUp") && player.y == playerY) {
        //jump
        velocityY = -10;
    }
}

function placeObstacle(){
    if (gameOver){
        return;
    }
    

    //place obstacle
    let obstacle = {
        img: null,
        x: obstacleX,
        y: obstacleY,
        width: null,
        height: obstacleHeight
    }

    let placeObstacleChance = Math.random(); //0 - 0.999...
    if(placeObstacleChance > .90) { //10% 
        obstacle.img = obstacle3Img;
        obstacle.width = obstacle3Width;
        obstacleArray.push(obstacle);
    }
    else if(placeObstacleChance > .70) { //30%
        obstacle.img = obstacle2Img;
        obstacle.width = obstacle2Width;
        obstacleArray.push(obstacle);
    }
    else if(placeObstacleChance > .50) { //50%
        obstacle.img = obstacle1Img;
        obstacle.width = obstacle1Width;
        obstacleArray.push(obstacle);
    }

    if (obstacleArray.length > 5) {
        obstacleArray.shift(); //remove the first element from the array so that the array doesnt constantly grow
    }

}

function detectCollision(a, b) {
    return a.x < b.x + b.width && //a's top left corner doesnt reach b's top right corner
           a.x + a.width > b.x && //a's top right corner passes b's top left corner
           a.y < b.y + b.height && //a's top left corner doesnt reach b's bottom left corner
           a.y + a.height > b.y; //a's bottom left corner passes b's top left corner

}