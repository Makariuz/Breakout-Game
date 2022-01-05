

* { 
    padding: 0; 
    margin: 0; 
}

body {
    font-family: "Press Start 2P";
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("./images/bg3.jpg");
    background-repeat: no-repeat;
    background-size: cover; /* make sure the sizing doesn't change */
}

@keyframes titleFx {
    0%   {
        font-size: 2rem;
    }
    50% {
        font-size: 1.99rem;
    }
}


canvas { 
    background: #eee; 
    display: block; 
    margin-top: 50px;
    position: absolute;
    background-image: url("./images/bgGame.jpg");
    background-repeat: no-repeat;
    background-size: 700px 400px;
    animation-name: frame;
    animation-duration: .7s;
    animation-iteration-count: infinite;
    animation-direction: forward;
    border: 3px solid white;
    border-radius: 5px;
    
}

@keyframes bgFx {
    0%   {
        background-size: 700px 400px;
    }
    50% {
        background-size: 700px 400.1px;
    }
}

.titleSpan:hover {
    color: #2bd2fcb7;
    cursor: pointer;
}


.instructions {
    display:none;
    position: absolute;
    margin-top: 250px;
    width: 510px;
    height: 300px;
    background-color: rgba(0, 10, 102, 0.904);
    color: white;
    text-align: center;
}

.highscore {
    display:none;
    position: absolute;
    margin-top: 250px;
    width: 510px;
    height: 300px;
    background-color: rgba(0, 10, 102, 0.904);
    color: white;
    text-align: center;
}

.highscore li span {
    position: absolute;
    left: -10px;
}

.insertCoin{
    position: absolute;
    margin-left: 270px;
    margin-top: 400px;
    color: 	#f3ea5f;
    animation-name: insertCoin;
    animation-duration: .7s;
    animation-iteration-count: infinite;
    animation-direction: forward;
}


@keyframes insertCoin {
    0%   {
        color: 	#f3ea5f;
    }
    20% {
        color: 	#f3e95f00;
    }
}


.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    padding-top: 4px;
  }
  
.close:hover,
.close:focus {
    color: #f3ea5f;
    text-decoration: none;
    cursor: pointer;
}

.titleGame {
    text-align: center;
    padding-top: 70px;
    margin-bottom: 35px;
    font-size: 2rem;
    color: #2bd1fc;
    text-shadow: 10px 5px darkred;
    animation-name: titleFx;
    animation-duration: .7s;
    animation-iteration-count: infinite;
    animation-direction: forward;
}


.gameDiv {
    background-color: transparent;
    width: 700px;
    height: 400px;
}

.gameContainer {
    display:block;
}

.startBtn {
    font-family: "Press Start 2P";
    position: absolute;
    cursor: pointer;
    margin-top: 150px;
    margin-left: 270px;
    padding: 20px 50px;
    border-radius: 5px;  
    background-color: #2bd1fc;
    border-radius: 5px; 
    border-width: 3px;
    border-color: white;
    color: #963bc4;
    animation-name: frame;
    animation-duration: .7s;
    animation-iteration-count: infinite;
    animation-direction: forward;
}
.muteBtn {
    position: absolute;
    cursor: pointer;
    margin-top: 310px;
    margin-left: 335px;
    background-color: #2bd1fc;
    border-radius: 5px; 
    border-width: 3px;
    border-color: white;
}

.muteBtn:hover {
    text-decoration: underline;
}
.instBtn {
    font-family: "Press Start 2P";
    position: absolute;
    cursor: pointer;
    margin-top: 230px;
    margin-left: 220px;
    padding: 20px 50px;
    background-color: #2bd1fc;
    border-radius: 5px; 
    border-width: 3px;
    border-color: white;
    color: #963bc4;
}

.startBtn:hover {
    text-decoration: underline;
}

.instBtn:hover{
    text-decoration: underline;
}
.gameOverPage{
    display:none;
    background: rgb(221, 218, 218); 
    margin: 50px;
    width: 700px;
    height: 400px;
    background-image: url("./images/bgGame.jpg");
    background-repeat: no-repeat;
    background-size: 700px 400px;
    border: 3px solid white;
    border-radius: 5px;

}

.scoreSpan {
    font-size: 2rem;
}

.winPage{
    display:none;
    margin: 50px;
    width: 700px;
    height: 400px;
    background: rgb(221, 218, 218); 
    background-image: url("./images/bgGame.jpg");
    background-repeat: no-repeat;
    background-size: 700px 400px;
    border: 3px solid white;
    border-radius: 5px;
    color:#f3ea5f;
    text-align: center;
   
  
}
.winPage h2{
    font-size: 3rem;
    text-shadow: 10px 5px darkred;
    animation-name: gameOver;
    animation-duration: .5s;
    animation-iteration-count: infinite;
    color:red;
    padding-top: 30px;
}
.gameOverPage h2{
    text-align: center;

    padding-top: 30px;
    font-size: 3rem;

    color:red;
    text-shadow: 10px 5px darkred;
    animation-name: gameOver;
    animation-duration: .5s;
    animation-iteration-count: infinite;
}

.gameOverPage p{
    text-align: center;
    color: 	#f3ea5f;
}

.restartBtnContainer {
    display:flex;
    justify-content: center;
    align-content: center;

}

.restartBtn2{
    font-family: "Press Start 2P";
    padding:10px 30px 10px 30px;
    background-color: #f3ea5f;
    border-radius: 5px;
    margin-top: 90px;
    position: relative;
    cursor: pointer;
    color: #963bc4;
}

.restartBtn{
    font-family: "Press Start 2P";
    padding:10px 30px 10px 30px;
    background-color: #f3ea5f;
    border-radius: 5px;
    margin-top: 90px;
    position: relative;
    cursor: pointer;
    color: #963bc4;
}

.restartBtn:hover{
    background-color: yellow;
    text-decoration: underline;

}
.restartBtn2:hover{
    background-color: yellow;
    text-decoration: underline;

}

@keyframes gameOver {
    0%   {
        color: red;
        text-shadow: 10px 5px darkred;
    }
    100% {
        color: yellow;
        text-shadow: 10px 5px darkgoldenrod;
    }
    0%   {
        color: red;
        text-shadow: 10px 5px darkred;
    }
}


.controls {
    position:absolute;
    margin-top: 800px;
    display:none;
}

.left,
.right {
    padding: 30px;
    margin:0 100px 0 100px;
    border-radius: 100px;
    background-color: #ff3f3f;
    border: 2px solid white;
    text-align: center;
}