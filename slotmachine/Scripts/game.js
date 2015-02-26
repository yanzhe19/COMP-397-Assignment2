/// <reference path="objects/button.ts" />
// CreateJS Slotmachine typescript file
// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas; // Reference to the HTML 5 Canvas element
var stage; // Reference to the Stage
var reels = [];
var reelContainers = [];
// GAME CONSTANTS
var NUM_REELS = 3;
//game objects
var game; //main game container object
var background;
var spinBtn;
var betMaxBtn;
var betOneBtn;
var resetBtn;
var powerBtn;
// GAME VARIABLES
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
// Functions Section++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events
    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
}
// GAMELOOP
function gameLoop() {
    stage.update();
}
//create the UI in canvas
function createUI() {
    //add background to the canvas
    background = new createjs.Bitmap("assets/images/slotBody.png");
    game.addChild(background);
    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 155;
    reelContainers[0].y = 100;
    reelContainers[1].x = 310;
    reelContainers[1].y = 100;
    reelContainers[2].x = 470;
    reelContainers[2].y = 100;
    //set the initial reel image to all blanks
    showReelResults(["Blank", "Blank", "Blank"]);
    //spinBtn section++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //add spin button
    spinBtn = new Objects.Button("assets/images/btnSpin.png", 580, 355);
    game.addChild(spinBtn.getImage());
    //add event listener to spin button
    spinBtn.getImage().addEventListener("click", spinClick);
    //End of spinBtn section+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //add Reset button
    resetBtn = new Objects.Button("assets/images/btnReset.png", 120, 355);
    game.addChild(resetBtn.getImage());
    //resetBtn click to reset all
    resetBtn.getImage().addEventListener("click", resetAll);
    //add power button
    powerBtn = new Objects.Button("assets/images/btnPower.png", 60, 355);
    game.addChild(powerBtn.getImage());
    //add event listener to reset button
    powerBtn.getImage().addEventListener("click", close_window);
    //add Bet one button
    betOneBtn = new Objects.Button("assets/images/btnBetOne.png", 180, 355);
    game.addChild(betOneBtn.getImage());
    //add Bet max button
    betMaxBtn = new Objects.Button("assets/images/btnBetMax.png", 240, 355);
    game.addChild(betMaxBtn.getImage());
}
//main function
function main() {
    game = new createjs.Container();
    createUI();
    stage.addChild(game);
}
function close_window() {
    if (confirm("Do you want to quit the game?")) {
        close();
    }
}
//function when button clicked
function spinClick() {
    playerBet = 5; //$("div#betEntry>input").val();
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        console.log(fruits);
        //function change image showed
        showReelResults(spinResult);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
}
//show the reel results to the canvas
function showReelResults(spinResult) {
    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        reels[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(reels[index]);
    }
}
/* Utility function to show Player Stats */
function showPlayerStats() {
    //winRatio = winNumber / turn;
    //$("#jackpot").text("Jackpot: " + jackpot);
    //$("#playerMoney").text("Player Money: " + playerMoney);
    //$("#playerTurn").text("Turn: " + turn);
    //$("#playerWins").text("Wins: " + winNumber);
    //$("#playerLosses").text("Losses: " + lossNumber);
    //$("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}
/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}
/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    //set all reel image to initial status
    showReelResults(["Blank", "Blank", "Blank"]);
}
/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}
/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    //$("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}
/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    // $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}
/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}
/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];
    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "Blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}
/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }
}
//# sourceMappingURL=game.js.map