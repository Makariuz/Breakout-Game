<!DOCTYPE html>

<html>

  <head>

    <meta name = "viewport" content = "width=device-width">
    <title>Breakout Game</title>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    <!-- styles -->
    <link href = "./style.css" rel = "stylesheet">
    <!-- favicon error -->
    <link rel="icon" href="img/icon.svg" />

  </head>
 
  <body>
      <div class="titleGame">
      <h1> <span class="titleSpan"> Breakout Game </span></h1>
    </div>
        <div class="gameContainer">
            <div class="gameDiv">
            <canvas id="myCanvas" width="700" height="400"></canvas>
            <button class="startBtn">START</button>
            <button class="instBtn">INSTRUCTIONS</button>
          <!--   <button class="scoreBtn">HIGHSCORE</button> -->
            <button class="muteBtn"> <img src="images/mute.png" alt="mute" width="30" height="30"> </button>
            <span class="insertCoin">  Insert Coin</span>
            </div>

        </div>

   <!--  <div class ="highscore">
        <br>
          <h2>HIGH SCORE</h2>
          <br><br>
            <li>AAAA: 9999</li>
            <li>BBBB: 9999</li>
    </div> -->
   
    <div class="instructions">
      <p><span class="close">&times;</span>
        <br><br>
        Using a single ball, must knock down as many bricks as possible by using the walls <br><br>
      or   <br><br>the paddle below to hit the ball against the bricks and eliminate them. <br><br>
        If you miss the ball's rebound, you lose a live (3 in total). <br><br>
         Use LEFT and Right ARROWS to move paddle.
      </p>
    </div>

    <div class="winPage">
      <h2> PERFECT SCORE </h2>
      <br><br><br>
        <p>YOUR FINAL SCORE IS: </p>
        <br><br><br>
        <p> <span class="scoreSpan">   0  </span></p>
      <div class="restartBtnContainer2">
          <button class="restartBtn2">RESTART</button>
      </div>
  </div>

    <div class="gameOverPage">
        <h2> GAME OVER </h2>
        <br><br><br>
        <p>YOUR FINAL SCORE IS: </p>
        <br><br><br>
        <p> <span class="scoreSpan2">   0  </span></p>
        <div class="restartBtnContainer">
            <button class="restartBtn">RESTART</button>
        </div>
    </div>
    <div class="controls">
      <button class="left"> <img src="./images/left.png" alt="left" width="15" height="15"></button>
      <button class="right"> <img src="./images/right.png" alt="right" width="15" height="15"></button>
    </div>

    <!-- js -->
    <script src = "game.js"></script>

  </body>

</html>
