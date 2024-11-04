import {
    onePairTwoPair, oneTotals, twoTotals, threeOfAKind, threeTotals,
    fourOfAKind, fourTotals, fiveTotals, sixTotals, subtotalAndBonus,
    smallStraight, largeStraight, sumFullHouse, chance, yatzyRoll,
    finalScore, yatzyTestingFunction, displayScoreTable, scoreTable
} from './yatzyEngine.js';
import { rollDice } from './diceRoller.js';

let diceValues = [];
let turnRollCounter = 1;
const maxGames = 3;
const maxRounds = 15;
let gameCount = 1;
let roundCount = 1;
const scoreButton = document.getElementById('scoreButton');
const reRollButton = document.getElementById('reRollButton');
const rollButton = document.getElementById('rollButton');

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
    currentGame: 1,
    totalScores: [0],
    winner: null
};

let gameState = { ...defaultGameState };
let diceState = { ...defaultDiceState };

document.addEventListener('DOMContentLoaded', () => {
    rollButton.classList.add('disabled');
    reRollButton.classList.add('disabled');
    scoreButton.classList.add('disabled');
    initializeGame();
});

function resetGameState() {
    gameState = { ...defaultGameState };
    console.log("Game state reset to default values!");
}
function resetDiceState() {
    diceState = { ...defaultDiceState };
    diceValues = Array(5).fill(0);
    console.log("Dice state reset to default values!");
}

function resetElements() {
    const spanElements = document.querySelectorAll('span');
    const divElements = document.querySelectorAll('div');

    spanElements.forEach(span => {
        span.textContent = '0';
        span.classList.remove("saved");
    });

    divElements.forEach(div => {
        div.classList.remove("saved");
    });
}

function initializeGame() {
    resetGameState();
    resetDiceState();
    resetElements()
    console.log("New game started!");
    rollButton.classList.toggle('disabled');
}

function rollFiveDice() {
    for (let i = 0; i < 5; i++) {
        diceState[i] = rollDice();
        diceValues[i] = diceState[i];
    }
    updateDiceDisplay();
}

function reRollDice(obj) {
    console.log(diceValues);
    let valKey = "";
    const keyIndexMap = {
        dice1: 0,
        dice2: 1,
        dice3: 2,
        dice4: 3,
        dice5: 4
    };
    for (const key in obj) {
        if (obj[key] === false && keyIndexMap.hasOwnProperty(key)) {
            valKey = key + "Value";
            console.log(valKey);
            obj[valKey] = rollDice();
            diceValues[keyIndexMap[key]] = obj[valKey];
            console.log(diceValues);
        }
    }
    updateDiceDisplay();
}

function endGame() {
    if (gameState.totalScores[0] > gameState.totalScores[1]) {
        gameState.winner = 1;
    } else if (gameState.totalScores[0] < gameState.totalScores[1]) {
        gameState.winner = 2;
    } else {
        gameState.winner = "Tie";
    }
    gameCount += 1;
    if (gameCount > maxGames) {
        const playAgain = confirm("Do you want to play again?");
        if (playAgain) {
            const spanElements = document.querySelectorAll('span');

            spanElements.forEach(span => {
                span.textContent = '0';
                span.classList.remove("saved");
            });
            initializeGame();
        } else {
            alert("Thank you for playing!");
        }
    }
    console.log(`Game over! Winner: Player ${gameState.winner}`);
}

function updateDiceDisplay() {
    for ( let i = 0; i < diceValues.length; i++ ) {
        let dieId = "dice" + (i + 1).toString();
        document.getElementById(dieId).innerText = diceValues[i];
    }
}

function calculateScore() {
    yatzyTestingFunction(diceValues);
    displayScoreTable(gameCount);
}

rollButton.addEventListener('click', () => {
    rollFiveDice();
    updateDiceDisplay();
    calculateScore();
    scoreButton.classList.toggle('disabled');
    rollButton.classList.toggle('disabled');
    reRollButton.classList.toggle('disabled');
    turnRollCounter += 1;
});

reRollButton.addEventListener('click', () => {
    reRollDice( diceState );
    updateDiceDisplay();
    calculateScore();
    turnRollCounter += 1;
    if (turnRollCounter > 3) {
        reRollButton.classList.toggle('disabled');
    }
});

scoreButton.addEventListener('click', () => {
    rollButton.classList.toggle('disabled');
    reRollButton.classList.toggle('disabled');
    scoreButton.classList.toggle('disabled');
    resetDiceState();
    resetElements()
    roundCount += 1;
    if (roundCount > maxRounds) endGame();
});

const spanElements = document.querySelectorAll('span');

spanElements.forEach(span => {
    span.addEventListener('click', (event) => {
        clickToSave(event.target.id);
        console.log('Span clicked!');
    });
});
const divElements = document.querySelectorAll('.die');

divElements.forEach(div => {
    div.addEventListener('click', (event) => {
        clickToSave(event.target.id);
        console.log('Div with class "die" clicked!');
    });
});

function clickToSave(elementId) {
    const elementType = document.getElementById(elementId);
    const tableKey = elementId.slice(0,-11);
    if ((!elementType.classList.contains('saved'))) {
        elementType.classList.add("saved");
        if (diceState.hasOwnProperty(elementId)) {
            diceState[elementId] = true;
            console.log(elementId)
        } else if (scoreTable.hasOwnProperty(tableKey)) {
            document.getElementById(elementId).classList.add("locked");
            console.log(tableKey)
        }
        console.log("Element Saved");
    } else {
        elementType.classList.remove("saved");
    }
}
