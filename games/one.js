let currMoleTile;
let currWitchTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    // set up the grid for the game board in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1000); //1000 milisec = 2 second
    setInterval(setWitch, 2000) //2000 milisec = 2 second
}

function getRandomTile() {
    // Math.random --> (0-1) * 9 = (0-9) --> round down to (0-8) int
    let num = Math.floor(Math.random() *9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "img-game/key.png";

    let num = getRandomTile();
    if (currWitchTile && currWitchTile.id == num){
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setWitch() {
    if (gameOver) {
        return;
    }

    if (currWitchTile) {
        currWitchTile.innerHTML = "";
    }

    let Witch = document.createElement("img");
    Witch.src = "img-game/maria.svg";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num){
        return;
    }
    currWitchTile = document.getElementById(num);
    currWitchTile.appendChild(Witch);
}

function selectTile() {
    if (gameOver) {
        return;
    }

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score
    }
    else if (this == currWitchTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true
    }
}