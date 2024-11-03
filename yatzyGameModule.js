import {
    onePairTwoPair, oneTotals, twoTotals, threeOfAKind, threeTotals,
    fourOfAKind, fourTotals, fiveTotals, sixTotals, subtotalAndBonus,
    smallStraight, largeStraight, sumFullHouse, chance, yatzyRoll,
    finalScore
} from './yatzyEngine.js';
import { rollDice } from './diceRoller.js';

const diceValues = [];
const diceIdValues = ["dice1", "dice2", "dice3", "dice4", "dice5"];
// let totalScore = 0;
const savedDice = [];
let turnRollCounter = 1;
const dieArray = [];
const dieHistory = [];
const maxRounds = 15;
let gameCount = 1;
let roundCount = 1;

const defaultDiceState = {
    dice1Value: 0,
    dice2Value: 0,
    dice3Value: 0,
    dice4Value: 0,
    dice5Value: 0,
    dice1: false,
    dice2: false,
    dice3: false,
    dice4: false,
    dice5: false,
}
const defaultGameState = {
    currentPlayer: 1,
    currentRound: 1,
    totalScores: [0],  // a one-player game
    winner: null
};
let gameState = { ...defaultGameState };
let diceState = { ...defaultDiceState };
function resetGameState() {
    gameState = { ...defaultGameState };
    console.log("Game state reset to default values!");
}
function resetDiceState() {
    diceState = { ...defaultDiceState };
    console.log("Dice state reset to default values!");
}

function initializeGame() {
    resetGameState();
    resetDiceState();
    console.log("New game started!");
    // set or reset scores and dice to play a new game
    // diceValues = [];
    // totalScore = 0;
    // savedDice = [];
    // turnRollCounter = 0;
    // initialize 5 dice objects from the die class
    // const dice1 = new die("dice1");
    // const dice2 = new die("dice2");
    // const dice3 = new die("dice3");
    // const dice4 = new die("dice4");
    // const dice5 = new die("dice5");
    // for (let x in diceIdValues) {
    //     dieArray[x] = new die (diceIdValues[x]);
    // }
}

function rollFiveDice() {
    for ( let i = 0; i < 5; i++ ) {
        diceState[i] = rollDice();
    }
    updateDiceDisplay();
}

function playGame () {
    if ( turnRollCounter > 3 ) {
        turnRollCounter = 1;
        resetDiceState();
        roundCount += 1;
        if (roundCount == 16) endGame();
    }
}

function endGame() {
    if (gameState.totalScores[0] > gameState.totalScores[1]) {
        gameState.winner = 1;
    } else if (gameState.totalScores[0] < gameState.totalScores[1]) {
        gameState.winner = 2;
    } else {
        gameState.winner = "Tie";
    }
    console.log(`Game over! Winner: Player ${gameState.winner}`);
}

function updateDiceDisplay() {
    document.getElementById("dice1").innerText = diceState[0];
    document.getElementById("dice2").innerText = diceState[1];
    document.getElementById("dice3").innerText = diceState[2];
    document.getElementById("dice4").innerText = diceState[3];
    document.getElementById("dice5").innerText = diceState[4];
}

function calculateScore() {
    /* build array from dice values;
        display calculated scores for those values;
    */
}

document.getElementById('rollButton').addEventListener('click', () => {
    rollFiveDice();
    updateDiceDisplay();
    const button = document.getElementById('rollButton');
    button.classList.add('disabled');
    button.disabled = true;
    turnRollCounter += 1;
});

document.getElementById('re-rollButton').addEventListener('click', () => {
    rollFiveDice();
    updateDiceDisplay();
    const button = document.getElementById('re-rollButton');
    turnRollCounter += 1;
    if( turnRollCounter > 3 ) {
        button.classList.add('disabled');
        button.disabled = true;
    }
});

document.getElementById('scoreButton').addEventListener('click', () => {
    const scoreButton = document.getElementById('scoreButton');

    const reRollButton = document.getElementById('re-rollButton');
    const rollButton = document.getElementById('rollButton');
    rollButton.classList.toggle('disabled');
    reRollButton.classList.toggle('disabled');
    resetDiceState();
});
// function startGame() {
//     diceValues = diceValues.concat(multiRoll(5, diceIdValues));
//     for (let x = 0; x < diceValues.length; x++) {
//         dieArray[x].dieValue = diceValues[x];
//         altTextWriter( x );
//         rollHistory( x );
//     }
//     turnRollCounter += 1;
//     updateDiceDisplay();
// }

// function clickToSaveDie( id ) {
//     dieArray[id].saved = true;
//     savedDice.push(id);
//     console.log(savedDice);
//     // dieObject saved = true
//     // add code to highlight selected die with css
// }

// function reRoll() {
//     let diceNumbers = 5 - savedDice.length;
//     let tempArray = multiRoll(diceNumbers, );
//     let counter = 0;
//     for (let i = 0; i < dieArray.length; i++) {
//         if (dieArray[i].saved == false && counter < diceNumbers) {
//             diceValues[i] = tempArray[counter];
//             rollHistory(tempArray[counter]);
//             counter += 1;
//         }
//         else {
//             break;
//         }
//     }
//     turnRollCounter += 1;
//     updateDiceDisplay();
// }

// function rollHistory( die ) {
//     dieHistory.push(die);
// }  -- DEPRECATED --