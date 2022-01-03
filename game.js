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

//CANCEL ANIMATION ID (work in progress)
let id = null

//AUDIOS
let click = new Audio()
click.src = "/sounds/click.mp3"
click.volume = .2;
let fail = new Audio()
fail.src = "/sounds/fail.mp3"
fail.volume = .2;
let bgMusic = new Audio()
bgMusic.src = "/sounds/BreakoutDemo.mp3"

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


//SCORE
let score = 0;

//HEALTH
let lives = 3;


let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

let randomColor = Math.floor(Math.random()*16777215).toString(16);

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
    else if (e.keyCode === 32){
        paddleWidth = 75;
    }
}


startBtn.addEventListener("click", () => {
    startBtn.hidden = true
    muteBtn.hidden = true
    controls.style.display ="block"
    if (instPage.style.display = "none"){
        instBtn.hidden = true
    }
    draw();

})

titleSpan.addEventListener("click", () => {
    document.location.reload();
    draw()
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

//COLLISION
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    click.play()
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        click.muted = true;
                        fail.muted = true;
                        lives = 15
                        controls.style.display ="none"
                        startGame.style.display = "none"
                        winPage.style.display = "block";
                        scoreSpan.textContent = score;
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

//PADDLE
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
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        click.play()
    }
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
                  console.log(score)
                  scoreSpan.textContent = score;
                 
                  controls.style.display ="none"
                  startGame.style.display = "none"
                  gameOverPage.style.display = "block"
                  scoreSpan2.textContent = score;

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
    cancelAnimationFrame(id)
}

