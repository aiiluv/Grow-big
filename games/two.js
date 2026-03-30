
//board
let board; 
let boardWidth = 360;
let boardHeight = 640;
let context;

//player
let playerWidth = 34;//width/height ratio = 408/228 = 17/12
let playerHeight = 24;
let playerX = boardWidth/8;
let playerY = boardHeight/2;
let playerImg;

let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64;//width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //pipes moving
let velocityY = 0; //player jump speed
let gravity = 0.4;

let gameOver = false;

window.onload = function() {
    board = this.document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth
    context = board.getContext("2d"); //used for drawin on the board

    //draw player
    context.fillstyle = "green";
    context.fillRect(player.x, player.y, player.height, player.width);

    //load images
    playerImg = new Image();
    playerImg.src = "";
    playerImg.onload = function() {
        context.drawImage(playerImg, player.x, player.y, player.height, player.width);
    }

    topPipeImg = new Image();
    topPipeImg.src = "";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", movePlayer);
}

function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //player
    velocityY += gravity;
    player.y = Math.max(player.y + velocityY, 0); //apply gravity to current player.y. limit player
    // player.y += velocityY;
    context.drawImage(playerImg, player.x, player.y, player.height, player.width);

    if (player.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipeImg, pipe.x, pipe.y, pipe.height, pipe.width);

        if (!pipe.passed && player.x > pipe.x + pipe.width) {
            Score += 0.5; //0.5 because there are 2 pipes
            pipe.passed = true;
        }

        if (detectCollision(player, pipe)) {
            gameOver = true;
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //removes first element from the array
    }

    //score
    context.fillstyle = "white";
    context.font="45px sans-serif";
    context.fillText(Score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }

}

function placePipes(){
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2 = -3/4 pipeHeight)
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottomPipe);
}

function movePlayer(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "keyX") {
        //jump
        velocityY = -6;

        //reset game
        if (gameOver) {
            player.y = playerY;
            pipeArray = [];
            Score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}