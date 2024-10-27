const die = {dieValue:0, altText:"Die value rolled is ", dieImage:"src"};
const diceValues = [];
const totalScore = 0;

function initializeGame() {
    // set or reset scores and dice to play a new game
    diceValues = [];
    totalScore = 0;
}

function updateDiceDisplay() {
    document.getElementById("dice1").innerText = diceValues[0];
    document.getElementById("dice2").innerText = diceValues[1];
    document.getElementById("dice3").innerText = diceValues[2];
    document.getElementById("dice4").innerText = diceValues[3];
    document.getElementById("dice5").innerText = diceValues[4];
}

function startGame() {
    for (let i = 0; i < 5; i++) {
        diceValues[i] = rollDice();
    }
}

function clickToSaveDie() {
    return null;
}