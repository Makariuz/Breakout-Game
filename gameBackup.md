const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")

//MODUL PAGES

let gameOverPage = document.querySelector(".gameOverPage")
let winPage = document.querySelector(".winPage")
let instPage = document.querySelector(".instructions")
let startGame = document.querySelector(".gameContainer")

//BUTTONS

let instBtn = document.querySelector(".instBtn")
let leftBtn = document.querySelector(".left")
let rightBtn = document.querySelector(".right")
let controls = document.querySelector(".controls")

let startBtn =  document.querySelector(".startBtn")
let restartBtn = document.querySelector(".restartBtn")
let restartBtn2 = document.querySelector(".restartBtn2")
let closeBtn = document.querySelector(".close")
let muteBtn = document.querySelector(".muteBtn")

//SPANS
let titleSpan = document.querySelector(".titleSpan")
let scoreSpan = document.querySelector(".scoreSpan")
let scoreSpan2 = document.querySelector(".scoreSpan2")
let insertCoin = document.querySelector(".insertCoin")

//CANCEL ANIMATION ID (work in progress)
let id = null

//AUDIOS
let click = new Audio()
click.src = "./sounds/click.mp3"
click.volume = .2;
let fail = new Audio()
fail.src = "./sounds/fail.mp3"
fail.volume = .2;
//let bgMusic = new Audio()
//bgMusic.src = "./sounds/BreakoutDemo.mp3"

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

//BALL RADIUS
let ballRadius = 10; 


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


//NESTED LOOP, c = COLUMNS & r = ROWS;

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        //status of brick painted or not
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//TIMER
let timer = setInterval(function(){
    if(timeLeft <= 0){
      clearInterval(timer);
    }
    timeLeft -= 1;
  }, 1000);

/* 
let randomColor = Math.floor(Math.random()*16777215).toString(16);
 */

//PLAY MUSIC
window.onload=function(){
   
    bgMusic.play();
}

//EVEN LISTENERS

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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
    else if (e.keyCode === 76){
         dx = 2;
         dy = -2;
    }
}


startBtn.addEventListener("click", () => {
    startBtn.hidden = true
    muteBtn.hidden = true
    controls.style.display ="block"
    insertCoin.style.display ="none"
    if (instPage.style.display = "none"){
        instBtn.hidden = true
    }
    draw();

})

titleSpan.addEventListener("click", () => {
    document.location.reload();
    
})



restartBtn.addEventListener("click", () => {
    document.location.reload();
   
    draw()
})

restartBtn2.addEventListener("click", () => {
    document.location.reload();
    draw()
})


closeBtn.addEventListener("click", () => {
    instPage.style.display = "none"
})

instBtn.addEventListener("click", () => {
    instPage.style.display = "block"
})

muteBtn.addEventListener("click", () => {
    bgMusic.muted = true;
})

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
                    if(score == brickRowCount*brickColumnCount) {
                        gameHalt()
                        click.muted = true;
                        fail.muted = true;
                        lives = 15
                        controls.style.display ="none"
                        startGame.style.display = "none"
                        winPage.style.display = "block";
                        scoreSpan.textContent = "Score: " + score + " | Time: " + timeLeft + "s";
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

//TIMER (DRAW)
function drawTimer(){
    ctx.font = "16px Press+Start+2P";
    ctx.fillStyle = "#f3ea5f";
    ctx.fillText(timeLeft, 340, 20);
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
                  score <= 4 && score > 0 ? scoreSpan2.textContent = "WOW, that was an awful score: "+ score : scoreSpan2.textContent = "Score: " + score + " | Time: " + (30 - timeLeft) + "s";;

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

function gameHalt() {
    window.cancelAnimationFrame(id)
}

