const die = {dieId: "", dieValue:0, altText:"Die value rolled is ", dieImage:"images/", saved: false};
const diceValues = [];
const totalScore = 0;
const savedDice = [];
const rollCounter = 0;

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
    diceValues = diceValues.concat(multiRoll(5));
    updateDiceDisplay();
}

function clickToSaveDie(id) {
    savedDice.push(id);
    console.log(savedDice);
    // dieObject saved = true
    // add code to highlight selected die with css
}

function reRoll() {
    let diceNumbers = 5 - savedDice.length;
    let tempArray = multiRoll(diceNumbers);
    let counter = 0;
    for (let i = 0; i < 5; i++) {
        if (die.saved == false) {
            diceValues[i] = tempArray[counter];
            counter += 1;
        }
    }
}