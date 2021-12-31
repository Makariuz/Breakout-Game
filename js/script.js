//BUTTONS
const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");

//QUERY SELECTORS
const gameOverPage = document.querySelector(".game-over-page");
const startPage = document.querySelector(".gameContainer")


//BUILDING CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//VARIABLE DECLARATION
let fallNotes =  []; //falling notes array // array must be maximum 14
let drawKeyPads = [];
let frames = 0;
let score = 0;
let lives = 3;
let keyP = [] //keyPads
let livesLeft = []; //lives left in game
let randomNotesX = [33, 113, 193,485,565,645]
let song = [30]
let twinkleStar = 'AABBCCDEEFFGGH' 
let randomColorX = ["burlywood", "white", "yellow", "blue", "purple", "orange"]
let songSpeed = 17; //set interval set to 17
let countdown = 5;
let keypadKeys = [65, 83, 68, 74, 74, 76]
let gameO = []
//AUDIOS

let twinkle = new Audio()
twinkle.src = "/sound/twinkle2.mp3"
let Cnote = new Audio()
Cnote.src = "/sound/Cnote.mp3"

//STYLES

//ctx.strokeStyle = "Burlywood"

//IMG DECLARATION
let keyA = "/images/A.webp";
let keyS = "/images/S.webp";
let keyD = "/images/D.webp";

let keyJ = "/images/J.webp";
let keyK = "/images/K.webp";
let keyL = "/images/L.webp";

//CLASS DECLARATION (missing img and this.img for the draw image)
class Keypad {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = color;
    }
    drawKeys(){
        ctx.lineWidth = 4;
        ctx.strokeStyle = this.color
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    top() {
        return this.y;
    }
}



class Notes {
    constructor(argX, argY, argWidth, argHeight, argColor) {
        this.x = argX;
        this.y = argY;
        this.width = argWidth;
        this.height = argHeight;
        this.color = argColor;
        this.speedY = -3;
      }
    
    move(){
        
        this.y -= this.speedY;
        
    }
    
    drawNotes(){
        this.move();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)   
    }

    notePosY(){
        return this.y
    }
    notePosX(){
        return this.x
    }

    coordenates(){
        return (" this is X: " + this.x + " ---- THIS IS Y: " + this.y)
    }
    bottom(){
        return this.y + this.height;
    }
}

class Health {
    constructor(healthX, healthY, color){
        this.healthX = healthX;
        this.healthY = healthY;
        this.color = color;
        this.width = 35;
        this.height = 35;
    }

    drawLives(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.healthX, this.healthY, this.width, this.height)
    }
}


//ARRAY KEY PUSH to KEYPADS
keyP.push(
    new Keypad(20, canvas.height - 70, "white"),
    new Keypad(100, canvas.height - 70, "white"),
    new Keypad(180, canvas.height - 70, "white"),

    new Keypad(canvas.width - 70, canvas.height - 70, "white"),
    new Keypad(canvas.width - 150, canvas.height - 70, "white"),
    new Keypad(canvas.width - 230, canvas.height - 70, "white")
)
livesLeft.push(
    new Health(260, canvas.height - 70, "burlywood"),
    new Health(320, canvas.height - 70, "burlywood"),
    new Health(405, canvas.height - 70, "burlywood"),
)

//FUNCTIONS & stuff
//4++ squares drawn intially

let count = 0
let rightNote = 1;
function draw(){
    frames++
    //draw the keyPad
    keyP.forEach(k => {
        k.drawKeys()  
    })
    if (frames % 30 === 0) { 
         fallNotes.push(new Notes(shuffleNote(randomNotesX), 0, 25, 25, shuffleNote(randomColorX)))
    }
        
    //skip one iteration and when song is over
    fallNotes.forEach(n => {
        if(fallNotes.indexOf(n) === 7) return
        if(fallNotes.indexOf(n) > 14) return
        //if(n.notePosY() === 300) console.log(n.notePosY() + " and X is " + n.notePosX() + " so the cordinates are: " + n.coordenates())
        if(n.bottom() === 331 && n.notePosX() === 33) {
            console.log("test")
        }
        n.drawNotes()
    });

    livesLeft.forEach(h => {
        h.drawLives()
    })

    if (frames === 600) {
        gameOver()
    }

    
    fallNotes.forEach(noteScore => {
        if(noteScore.notePosY() === 330) {
            playSong()
            //console.log(noteScore)
            //clearInterval(myInterval)
        }
        if(noteScore.notePosX() === 33 && noteScore.notePosY() === 330){
           // console.log(testCount++)
        }
    })

    ctx.font = "30px Outfit"
    ctx.fillStyle = "white"
    ctx.fillText('SCORE', 295, 50);
    ctx.font = "30px Outfit"
    ctx.fillStyle = "white"
    ctx.fillText(score, 345, 90);
    ctx.fillText(lives, 345, 150)
 
   
}

let z = -1;
let len = song.length - 1
function playSong(){
    len++
    z++
    //let keyNote = twinkleStar.charAt(z)
    twinkle.play()
}


/// DELAY FUNCTION for testing or future timer
function sleep(pause){
    const date = Date.now()
    let currentDate = null;
    do {
        currentDate = Date.now()
    } while (currentDate - date < pause);
}


function randomIntFromInterval(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
} 

function shuffleNote(randomNote){
    return randomNote[Math.floor(Math.random()*randomNote.length)]
}

function gameScore(){
    ctx.font = "30px Outfit"
    ctx.fillStyle = "white"
    ctx.fillText('SCORE', 295, 50);
    ctx.font = "30px Press-Start-2P"
    ctx.fillStyle = "white"
    ctx.fillText(score, 345, 100);
    ctx.fillText(lives, 345, 150)
}

//check if its a clickable score

//clickEach

function clickA(){
    fallNotes.forEach(notes => {
        if(notes.bottom() >= 300 &&
        notes.bottom() <= 400 &&
        notes.notePosX() === 33
        ) {score++} 
        if (notes.bottom() <= 300 &&
        notes.notePosX() === 33 || notes.bottom() === 0 && notes.notePosX() === 33) {lives--}
    })
}
function clickS(){
    
    fallNotes.forEach(notes => {
        if(notes.bottom() >= 300 &&
        notes.bottom() <= 400 &&
        notes.notePosX() === 113
        ) score++
    })
}


function clickD(){

    fallNotes.forEach(notes => {
        if(notes.bottom() >= 300 &&
        notes.bottom() <= 400 &&
        notes.notePosX() === 193
        ) score++
    })
    
}


function clickJ(){
    fallNotes.forEach(notes => {
        if(notes.bottom() >= 300 &&
        notes.bottom() <= 400 &&
        notes.notePosX() === 485
        ) score++
    })
    
}

function clickK(){

    fallNotes.forEach(notes => {
        if(notes.bottom() >= 300 &&
        notes.bottom() <= 400 &&
        notes.notePosX() === 565
        ) score++
    })
    
}

function clickL(){

    fallNotes.forEach(notes => {
        if(notes.bottom() >= 300 &&
        notes.bottom() <= 400 &&
        notes.notePosX() === 645
        ) score++
    })
    
}


function clicked(){
    //compare Y to position of note when falling)

    if (fallNotes.length <= 0 || fallNotes.length >= 50) return


    fallNotes.forEach(noteA => {
        if(noteA.bottom() >= 300 &&
        noteA.bottom() <= 400 &&
        noteA.notePosX() === 33
        ) score++
        if(noteA.bottom() >= 300 &&
        noteA.bottom() <= 400 &&
        noteA.notePosX() === 113
        ) score++
    })

    

}

function checkClick(){
    clicked()
    //run lifeLeft

}

function unClicked(){
    keyP.push(new Keypad(20, canvas.height - 70, "white"))

}

function lifeLeft(){
    console.log(livesLeft)
    lives = lives - 1
   
}

function stop(){
    if (score > 10){
        clearInterval(myInterval)
    }
}


let tim = 5


// LOAD START BUTTON (TEST)
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
     // document.getElementById("start-button").disabled = true;
      document.getElementById("start-button").hidden = true;
      startGame();
      myInterval = setInterval(startGame, songSpeed);
    }; 
}

startBtn.onload = function(){
    console.log("button loaded")
}


//gamecountdown
let seconds = 11;

function countDown(){
        
    for(let i = 11; i <= 0; i--){
        console.log(i)
    }
}





//START BUTTON (TEST)




function startGame(){  
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    draw();
    //gameOver();
}




//EVENT LISTENERS
document.addEventListener("keydown", (e) => {
    e.preventDefault();
  
  if (e.repeat) clearInterval(myInterval)
    switch(e.keyCode){
        case 65:
            keyP.push(new Keypad(20, canvas.height - 70, "red"))
            clickA()
        break;
        case 83:
            keyP.push(new Keypad(100, canvas.height - 70, "red"))
            clickS()
        break;
        case 68:
            keyP.push(new Keypad(180, canvas.height - 70, "red"))
            clickD()
        break;
        case 74:
            keyP.push(new Keypad(470, canvas.height - 70, "red"))
            clickJ()
        break;
        case 75:
            keyP.push(new Keypad(550, canvas.height - 70, "red"))
            clickK()
          
        break;
        case 76:
            keyP.push(new Keypad(630, canvas.height - 70, "red"))
            clickL()
         
        break;
           
    }
})

document.addEventListener("keyup", (e) => {
    switch(e.keyCode){
        case 65:
            keyP.push(new Keypad(20, canvas.height - 70, "white"))
            unClicked()
        break;
        case 83:
            keyP.push(new Keypad(100, canvas.height - 70, "white"))
            unClicked()
        break;
        case 68:
            keyP.push(new Keypad(180, canvas.height - 70, "white"))
            unClicked()
        break;
        case 74:
            keyP.push(new Keypad(470, canvas.height - 70, "white"))
            unClicked()
        break;
        case 75:
            keyP.push(new Keypad(550, canvas.height - 70, "white"))
            unClicked()
        break;
        case 76:
            keyP.push(new Keypad(630, canvas.height - 70, "white"))
            unClicked()
        break;
    }
})


function gameOver(){
    startPage.style.display = 'none';
    gameOverPage.style.display = 'block';
}

restartBtn.onclick = function(){
    gameOverPage.style.display = 'none';
    startPage.style.display = 'block';
   
}

startBtn.onmouseover = function(){
    Cnote.play()
}



