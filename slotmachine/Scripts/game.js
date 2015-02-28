/// <reference path="objects/button.ts" />
// CreateJS Slotmachine typescript file
//<!--File  name: game.ts, Author's  name: Zhe Yan (300706310), 
//    Last modified by: Zhe Yan, Date  last  Modified: 2015 - 2 - 26
//    Program  description: this is a slotmachine game based on createjs.
//user can play slotmachine game with this program.
//    Revision  History: version 2.0-->
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
//buttons
var spinBtn;
var betMaxBtn;
var betOneBtn;
var betFiveBtn;
var betTenBtn;
var resetBtn;
var powerBtn;
//all label text
var jackpotLabel;
var creditLabel;
var betLabel;
// GAME VARIABLES
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 5;
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
/*End of variable section+++++++++++++++++++++++++++++++++++++++++++++++++*/
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
    //set position for all reel containers
    reelContainers[0].x = 155;
    reelContainers[0].y = 100;
    reelContainers[1].x = 310;
    reelContainers[1].y = 100;
    reelContainers[2].x = 470;
    reelContainers[2].y = 100;
    //set the initial reel image to all blanks
    showReelResults(["Blank", "Blank", "Blank"]);
    //Button section++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //add spin button
    spinBtn = new Objects.Button("assets/images/btnSpin.png", 590, 355);
    game.addChild(spinBtn.getImage());
    //add event listener to spin button
    spinBtn.getImage().addEventListener("click", spinClick);
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
    betOneBtn = new Objects.Button("assets/images/btnBetOne.png", 240, 340);
    game.addChild(betOneBtn.getImage());
    //add event listener to betOneBtn button
    betOneBtn.getImage().addEventListener("click", betOneClick);
    //add Bet five button
    betFiveBtn = new Objects.Button("assets/images/btnBetFive.png", 180, 380);
    game.addChild(betFiveBtn.getImage());
    //add event listener to betFiveBtn button
    betFiveBtn.getImage().addEventListener("click", betFiveClick);
    //add Bet ten button
    betTenBtn = new Objects.Button("assets/images/btnBetTen.png", 240, 380);
    game.addChild(betTenBtn.getImage());
    //add event listener to betTenBtn button
    betTenBtn.getImage().addEventListener("click", betTenClick);
    //add Bet max button
    betMaxBtn = new Objects.Button("assets/images/btnBetMax.png", 175, 330);
    game.addChild(betMaxBtn.getImage());
    //add event listener to betMaxBtn button
    betMaxBtn.getImage().addEventListener("click", betMaxClick);
    //End of Button section+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Create all labels
    createLabel();
}
//main function
function main() {
    game = new createjs.Container();
    createUI();
    stage.addChild(game);
}
//function create all label object using easejs
function createLabel() {
    //set the jackpot label
    jackpotLabel = new createjs.Text(jackpot.toString(), "20px Arial", "#ffffff");
    jackpotLabel.x = 340;
    jackpotLabel.y = 403;
    jackpotLabel.textBaseline = "alphabetic";
    //set the bet label
    betLabel = new createjs.Text(playerBet.toString(), "20px Arial", "#ffffff");
    betLabel.x = 430;
    betLabel.y = 403;
    betLabel.textBaseline = "alphabetic";
    //set the credit label
    creditLabel = new createjs.Text(playerMoney.toString(), "20px Arial", "#ffffff");
    creditLabel.x = 507;
    creditLabel.y = 403;
    creditLabel.textBaseline = "alphabetic";
    //add all labels to the game container, so it will display in the screen
    game.addChild(jackpotLabel);
    game.addChild(betLabel);
    game.addChild(creditLabel);
}
/*++++++++++++++++++++++++++++Button click event section++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//function to quit the game when click power button
function close_window() {
    if (confirm("Do you want to quit the game?")) {
        close();
    }
}
//function when bet one button clicked
function betOneClick() {
    playerBet += 1;
    showPlayerStats();
    checkCredit();
}
//function when bet five button clicked
function betFiveClick() {
    playerBet += 5;
    showPlayerStats();
    checkCredit();
}
//function when bet ten button clicked
function betTenClick() {
    playerBet += 10;
    showPlayerStats();
    checkCredit();
}
//function when bet max button clicked
function betMaxClick() {
    playerBet = playerMoney;
    showPlayerStats();
    checkCredit();
}
//function when spin button clicked
function spinClick() {
    //playerBet = 5; //$("div#betEntry>input").val();
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
    else if (playerBet == 0) {
        alert("Select how much you want to bet!");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        //function change image showed
        showReelResults(spinResult);
        determineWinnings();
        turn++;
        showPlayerStats();
        //show user data in console for test purpose
        console.log(fruits);
        console.log(jackpot, playerBet, playerMoney);
    }
    else {
        alert("Please enter a valid bet amount");
    }
}
/*++++++++++++++++++++++++++++End of Button click event section++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//check if user have enough money to bet
function checkCredit() {
    if (playerBet > playerMoney) {
        spinBtn.getImage().mouseEnabled = false;
        spinBtn.getImage().alpha = 0.3;
    }
    else {
        spinBtn.getImage().mouseEnabled = true;
        spinBtn.getImage().alpha = 1;
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
    //update jackpot text message
    jackpotLabel.text = jackpot.toString();
    //update bet number
    betLabel.text = playerBet.toString();
    //update player's credit
    creditLabel.text = playerMoney.toString();
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
    //refresh the label text
    showPlayerStats();
    //refresh the spin button status
    spinBtn.getImage().alpha = 1;
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