const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")

//MODUL PAGES

let gameOverPage = document.querySelector(".gameOverPage")
let winPage = document.querySelector(".winPage")
let instPage = document.querySelector(".instructions")
let startGame = document.querySelector(".gameContainer")

let gameDiv = document.querySelector(".gameDiv")
let canvasClass = document.querySelector(".canvasClass")
let scoreList = document.querySelector(".scoreList")
let highScore = document.querySelector(".highscore")
let playerInput = document.querySelector(".playerNameInput")
let winTitle = document.querySelector(".winTitle")
let headerWin = document.querySelector(".headerWin")

//INPUT

const input = document.querySelector(".input");



//BUTTONS

let instBtn = document.querySelector(".instBtn")
let scoreBtn = document.querySelector(".scoreBtn")
let leftBtn = document.querySelector(".left")
let rightBtn = document.querySelector(".right")
let controls = document.querySelector(".controls")

let startBtn =  document.querySelector(".startBtn")
let restartBtn = document.querySelector(".restartBtn")
let restartBtn2 = document.querySelector(".restartBtn2")
let closeBtn = document.querySelector(".close")
let muteBtn = document.querySelector(".muteBtn")
let soundBtn = document.querySelector(".soundBtn")
let inputBtn = document.querySelector(".inputBtn")

//SPANS
let titleSpan = document.querySelector(".titleSpan")
let scoreSpan = document.querySelector(".scoreSpan")
let scoreSpan2 = document.querySelector(".scoreSpan2")
let insertCoin = document.querySelector(".insertCoin")
let cheatCode = document.querySelector(".cheatCode")

//CANCEL ANIMATION ID (work in progress)
let id = null

//AUDIOS
let click = new Audio()
click.src = "./sounds/click.mp3"
click.volume = .2;
let fail = new Audio()
fail.src = "./sounds/fail.mp3"
fail.volume = .2;
let bgMusic = new Audio()
bgMusic.src = "./sounds/Breakout.wav"

//BALL POSITION AND SPEED
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 6;
let dy = -6;

//PADDLE SIZING + location
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let enterKey = false;
let gameStarted = false;

//BALL RADIUS
let ballRadius = 10; 
let timer2 = 0;

//BRICK BUILD
let brickRowCount = 2;
let brickColumnCount = 7;
let brickWidth = 86;
let brickHeight = 30;
let brickPadding = 10;
let brickOffsetTop = 50;
let brickOffsetLeft = 20;

//TIMER
let timeLeft = 45;

//SCORE
let score = 0;

//HEALTH
let lives = 3;

//PLAYER
let playerName = "";

//ARRAYS
const scoreArray = JSON.parse(localStorage.getItem("scores")); // this is not working
const scoreArray2 = []

//NESTED LOOP, c = COLUMNS & r = ROWS;

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        //"status" of brick painted or not
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//TIMER


/* 
let randomColor = Math.floor(Math.random()*16777215).toString(16);
 */

//PLAY MUSIC
window.onload=function(){
    bgMusic.muted = false;
    bgMusic.play();
}


//PREVENT SPACE BAR FROM SCROLLING PAGE DOWN

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

//EVEN LISTENERS

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
/* document.getElementById("keypressed", enterKey, false) */






function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        rightBtn.style.backgroundColor = "#f3ea5f";
        rightBtn.style.height = "85px";
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") { 
        leftPressed = true;
        leftBtn.style.backgroundColor = "#f3ea5f";
        leftBtn.style.height = "85px";
    }
    else if (e.keyCode === 32){
        paddleWidth = 175;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
        rightBtn.style.backgroundColor = "#ff3f3f"
        rightBtn.style.height = "81px"
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
        leftBtn.style.backgroundColor = "#ff3f3f"
        leftBtn.style.height = "81px"
    }
    //extra help to reach the ball (cheating for testing purposes)
    else if (e.keyCode === 32){
        paddleWidth = 75;
    }
    //slow the ball down (cheating)
    else if (e.keyCode === 38){
         dx = 2;
         dy = -2;
    }
}


startBtn.addEventListener("click", () => {

  /*   nameTimer = setInterval((function() {
        timer2++
        if (timer2 === 3) clearInterval(nameTimer)
    })) */
    playerInput.style.visibility = "visible"
    gameStarted = true

/*     player.style.visibility = "visible"
    
    startBtn.hidden = true
    muteBtn.hidden = true
    scoreBtn.hidden = true
    controls.style.display ="block"
    insertCoin.style.display ="none"
    timer = setInterval(function(){
        timeLeft -= 1;
        if(timeLeft <= 0){
            clearInterval(timer);
          }
      }, 1000);

    if (instPage.style.display = "none"){
        instBtn.hidden = true
    }
    draw(); */

})

titleSpan.addEventListener("click", () => {
    document.location.reload();
})



restartBtn.addEventListener("click", () => {
   document.location.reload();
   
   
})

restartBtn2.addEventListener("click", () => {
    document.location.reload();
   
})

instBtn.addEventListener("click", () => {
    
    instPage.style.display = "block"
    setTimeout(function() {
        instPage.style.display = "none"
    }, 10000);

})

muteBtn.addEventListener("click", () => {
    muteBtn.hidden = true;
    soundBtn.style.display = "block";
    bgMusic.pause()
})

soundBtn.addEventListener("click", () => {
    muteBtn.hidden = false;
    soundBtn.style.display = "none";
    bgMusic.play();
})

//in construction
/* scoreBtn.addEventListener("click", () => {
    scoreList.textContent = playerName
    highScore.style.display = "block"
})
 */
    
inputBtn.addEventListener("click", () => {
    if (input.value) {
        playerName = input.value;
        input.value = "";
        start()
        playerInput.style.visibility = "hidden";
      }
})
/* insertCoin.addEventListener("click", () => {
    
    if (cheatCode.style.display = "block") {  
        insertCoin.style.display = "none"
    } else {
        cheatCode.style.display = "none"
    }

}) */

let count = 0



insertCoin.onclick = function(){
        score--
        count++
        if (count === 1){
        cheatCode.style.display = "block";
        insertCoin.style.display = "none";
        setTimeout(function() {
            insertCoin.style.display = "block";
            cheatCode.style.display = "none"
        }, 2000);
        } else if (count === 2) {
        cheatCode.style.display = "block";
        cheatCode.textContent = "Press UP to slow the ball down"
        insertCoin.style.display = "none";
        setTimeout(function() {
            insertCoin.style.display = "block";
            cheatCode.style.display = "none"
        }, 2000);
        } else if (count >= 3){
        cheatCode.style.display = "block";
        cheatCode.textContent = "No more cheats"
        insertCoin.style.display = "none";
        setTimeout(function() {
            insertCoin.style.display = "block";
            cheatCode.style.display = "none"
        }, 2000);
        }

  
}


function sleep(pause){
    const date = Date.now()
    let currentDate = null;
    do {
        currentDate = Date.now()
    } while (currentDate - date < pause);
}





//FUNCTIONS SECTION

let hit = score // tests
let totalBricks = brickRowCount*brickColumnCount //tests

//COLLISION
function collisionDetection() {

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            //b = store brick object  in each loop
            let b = bricks[c][r];
            //status of brick painted or not
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    console.log(totalBricks - score)
                    click.play()
                    dy = -dy; 
                    b.status = 0;
                    score++;
                    //check score

                    if(score == brickRowCount*brickColumnCount) {
                        gameHalt()
                        click.muted = true;
                        fail.muted = true;
                        lives = 15
                        controls.style.display ="none"
                        startGame.style.display = "none"
                        winPage.style.display = "block";
                        if(timeLeft >= 15) { 
                        headerWin.textContent = "PERFECT SCORE!"
                        winTitle.textContent = "SCORE"
                        scoreSpan.style.fontSize = "17px"
                        scoreSpan.textContent = `${playerName} scored: ${score} points under 30 seconds!`
                        } else {
                        headerWin.textContent = "CONGRATS!"
                        winTitle.textContent = "YOU WON!!"
                        scoreSpan.style.fontSize = "15px"
                        scoreSpan.textContent = `${playerName} scored: ${score} points but almost ran out of time!`
                        }
                        
                    }
                }
            }
        }
       
    }
}

//SCORE
function drawScore() {
    ctx.font = "16px Press+Start+2P";
    ctx.fillStyle = "#f3ea5f";
    ctx.fillText("Score: "+score, 8, 20);
}

//GET PLAYER NAME



//HIGHSCORE
/* 
function createItemScore(score, name) {
    const scoreItem = document.createElement("li");
    scoreItem.style.marginLeft = "290px"
    scoreItem.style.color = "#f3ea5f"
    scoreItem.textContent = `${name} ${score}`;
    console.log(scoreItem)
    scoreList.appendChild(scoreItem);
}
  
  // create multiple list elements from an array
function createListScore(scoreArray) {
    scoreList.textContent = "";
    scoreArray.sort((score1, score2) => score2.score - score1.score);
    const top3Scores = [];
    for (let i = 0; i < 1; i++) {
      if (scoreArray[i]) {
        top3Scores.push(scoreArray[i]);
      }
    }
    const top3ScoresTransformed = top3Scores.map((scoreItem) => {
      const first3Letter = `${scoreItem.name.charAt(0)}${scoreItem.name.charAt(1)}${scoreItem.name.charAt(2)}`;
  
      return {
        score: scoreItem.score,
        name: first3Letter.toLocaleUpperCase(),
      };
    });
    top3ScoresTransformed.forEach((scoreItem) => {
      createItemScore(scoreItem.score, scoreItem.name);
    });
  }
 */

//TIMER (DRAW)
function drawTimer(){
    ctx.font = "16px Press+Start+2P";
    ctx.fillStyle = "#f3ea5f";
    ctx.fillText(timeLeft, 340, 20);
}

let timer = 0;
function start(){
    playerInput.style.visibility = "visible"
    canvasClass.style.visibility = "visible"
    gameDiv.style.visibility ="hidden"
    startBtn.hidden = true
    muteBtn.hidden = true
/*     scoreBtn.hidden = true
 */    controls.style.display ="block"
    insertCoin.style.display ="none"

  /*   scoreArray.push({ name: playerName, score: score });
    localStorage.setItem("scores", JSON.stringify(scoreArray));
    createListScore(scoreArray);
 */

    timer = setInterval(function(){
        timeLeft -= 1;
        if(timeLeft <= 0){
            clearInterval(timer);
          }
      }, 1000);

    if (instPage.style.display = "none"){
        instBtn.hidden = true
    }
    draw();
}

//LIVES
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#f3ea5f";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


//BALL
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#f3ea5f";
    ctx.fill();
    ctx.closePath();
}

//PADDLE (PLAYER)
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


//BRICKS
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                //coordinates for the bricks to be created
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#2bd1fc"
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//DRAW ALL 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawTimer();
    drawLives();
    collisionDetection();

    


    //if colides with the bottom
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        click.play()
    }
    //if colides with the top
    if (y + dy < ballRadius) {
        dy = -dy;
        click.play()
    }

    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
                click.play()
                
            }
        }
        else {
            fail.play()
            lives--;
                if(lives === 0) {
                   // console.log("GAME OVER");
                   click.muted = true;
                   fail.muted = true;
                  gameHalt()
                  controls.style.display ="none"
                  startGame.style.display = "none"
                  gameOverPage.style.display = "block"
                  score <= 4 && score > 0 ? scoreSpan2.textContent = "WOW "+ playerName + ", that was an awful score: "+ score : scoreSpan2.textContent = score;
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 6;
                    dy = -6;
                    paddleX = (canvas.width-paddleWidth)/2;
}
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
   id = requestAnimationFrame(draw);

}


function closeModule (){
    instPage.style.display ="none"
    highScore.style.display = "none"
    playerInput.style.visibility = "hidden"  
}

function gameHalt() {
    clearInterval(timer)
    window.cancelAnimationFrame(id)
}

