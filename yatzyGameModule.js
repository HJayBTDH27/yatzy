import {
    onePairTwoPair, oneTotals, twoTotals, threeOfAKind, threeTotals,
    fourOfAKind, fourTotals, fiveTotals, sixTotals, subtotalAndBonus,
    smallStraight, largeStraight, sumFullHouse, chance, yatzyRoll,
    finalScore, yatzyTestingFunction, displayScoreTable, defaultScoreTable
} from './yatzyEngine.js';
import { rollDice } from './diceRoller.js';

let resetValue = false;
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
    dice1Value: null,
    dice2Value: null,
    dice3Value: null,
    dice4Value: null,
    dice5Value: null,
    dice1: false,
    dice2: false,
    dice3: false,
    dice4: false,
    dice5: false,
}
// const defaultGameState = {
//     currentPlayer: 1,
//     currentGame: 1,
//     totalScores: [0],
//     winner: null
// };

// let gameState = { ...defaultGameState };
let diceState = { ...defaultDiceState };
let scoreTable = { ...defaultScoreTable };

document.addEventListener('DOMContentLoaded', () => {
    rollButton.classList.add('disabled');
    reRollButton.classList.add('disabled');
    scoreButton.classList.add('disabled');
    initializeGame();
});

// function resetGameState() {
//     gameState = { ...defaultGameState };
//     console.log("Game state reset to default values!");
// }
function resetScoreTable() {
    scoreTable = { ...defaultScoreTable };
    console.log("Score table reset");
}
function resetDiceState() {
    diceState = { ...defaultDiceState };
    diceValues = Array(5).fill(0);
    updateDiceDisplay();
    console.log("Dice state reset to default values!");
}

function resetElements() {
    const spanElements = document.querySelectorAll('span');
    const divElements = document.querySelectorAll('div');
    
    spanElements.forEach(span => {
        if ( !span.classList.contains("saved") && !span.classList.contains("locked") && !resetValue) {
            span.textContent = '0';
        } else if ( span.classList.contains("saved") && !resetValue ){ 
            span.classList.remove("saved");
            span.classList.add("locked"); 
        } else if (!(span.id === `finalScoreRound${gameCount}`) && !(span.id === `upperScoreRound${gameCount}`)) {
            span.classList.remove("locked");
            span.classList.remove("saved");
            span.textContent = '0';
        } else {
            span.classList.add("locked"); 
        }
        /* -- original 3rd tier code -- else {
            span.classList.remove("locked");
            span.classList.remove("saved");
            span.textContent = '0';
        }  */
    });

    divElements.forEach(div => {
        div.classList.remove("saved");
    });

    for (const key in scoreTable) { 
        if (scoreTable.hasOwnProperty(key)) { 
            if (scoreTable[key].locked === false) { 
                scoreTable[key].value = 0; 
            } 
        } 
    }

    // TODO: Set "upper" and "final" <span> to "locked"
}

function initializeGame() {
    resetValue = true;
    // resetGameState();
    resetDiceState();
    resetScoreTable();
    resetElements();
    updateDiceDisplay();
    console.log("New game started!");
    rollButton.classList.toggle('disabled');
    resetValue = false;
}

function rollFiveDice() {
    let diceVal = "";
    for (let i = 0; i < 5; i++) {
        diceVal = "dice" + (i+1).toString() + "Value";
        diceState[diceVal] = rollDice();
        diceValues[i] = diceState[diceVal];
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
        if ( !document.getElementById(dieId).classList.contains("saved") ) {
            document.getElementById(dieId).innerText = diceValues[i];
        }
    }
}

function calculateScore() {
    yatzyTestingFunction( diceValues, scoreTable );
    console.log(`Post test- pre display scoreTable: ${JSON.stringify(scoreTable)}`);
    displayScoreTable( gameCount, scoreTable, false );
    console.log(`post - test / display scoreTable: ${JSON.stringify(scoreTable)}`);
}

// TODO: roll button has stopped disabling itself.
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
    scoreTable["upper", "final"].locked = false;
    console.log(`Pre-reset scoreTable: ${JSON.stringify(scoreTable)}`);
    resetElements();
    resetDiceState();
    calculateScore();
    console.log(`Post-reset scoreTable: ${JSON.stringify(scoreTable)}`);
    displayScoreTable( gameCount, scoreTable, true);
    roundCount += 1;
    scoreTable["upper", "final"].locked = false;
    if (roundCount > maxRounds) endGame();
});

const spanElements = document.querySelectorAll('span');

spanElements.forEach(span => {
    span.addEventListener('click', (event) => {
        // clickToSave(event.target.id);
        handleClick(event, 'span');
        console.log('Span clicked!');
    });
});
const divElements = document.querySelectorAll('.die');

divElements.forEach(div => {
    div.addEventListener('click', (event) => {
        // clickToSave(event.target.id);
        handleClick(event, 'div');
        // console.log(`This is the dice target id ${event.target.id}`);
        console.log('Div with class "die" clicked!');
    });
});

// -- monitor log for troubleshooting --
function handleClick(event, type) { const elementId = event.target.id; 
    clickToSave(elementId); 
    // console.log(`${type} element clicked with ID: ${elementId}`); 
}

function clickToSave(elementId) {
    // console.log(`C2S - 01 ${document.getElementById(`bonusScoreRound1`)}`);
    const elementType = document.getElementById(elementId);
    // console.log('Element Type:',elementType);
    const tableKey = elementId.slice(0,-11);
    
    if ((!elementType.classList.contains('saved'))) {
        elementType.classList.add("saved");
        
        if ( diceState.hasOwnProperty(elementId) ) {
            // console.log(`C2S - 02 ${document.getElementById(`bonusScoreRound1`)}`);
            diceState[elementId] = true;
            // console.log(elementId)
        
        } else if (scoreTable.hasOwnProperty(tableKey)) {
            // console.log(`C2S - 03 ${document.getElementById(`bonusScoreRound1`)}`);
            document.getElementById(elementId).classList.add("locked");
            scoreTable[tableKey].locked = true;
            // console.log(tableKey)
        }
        
        // console.log(`C2S - 04 ${document.getElementById(`bonusScoreRound1`)}`);
        // console.log("Element Saved");
    
    } else {
        elementType.classList.remove("saved");
    }
    // console.log('Updated Total Score Elements:', document.querySelectorAll('.total-score'));
    // const totalScoreElements = document.querySelectorAll('.total-score span');
    // console.log('Total Score Elements after click:', totalScoreElements); 
    // totalScoreElements.forEach((elem, index) => {
    //     console.log(`Total Score Element ${index + 1}:`, elem);
    // });
}
