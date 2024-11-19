import {
        yatzyTestingFunction, displayScoreTable, defaultScoreTable
    } from './yatzyEngine.js';
import { rollDice } from './diceRoller.js';

// ---------- VARIABLE DECLARATIONS ----------

// const maxGames = 3; // currently unused
const maxRounds = 15;
const scoreButton = document.getElementById('scoreButton');
const reRollButton = document.getElementById('reRollButton');
const rollButton = document.getElementById('rollButton');
const spanElements = document.querySelectorAll('span');
const divElements = document.querySelectorAll('.die');
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

let gameCount = 1;
let roundCount = 1;
let resetValue = false;
let diceValues = [];
let turnRollCounter = 1;
let diceState = { ...defaultDiceState };
let scoreTable = { ...defaultScoreTable };

const upperSpan = document.getElementById(`upperScoreRound${gameCount}`);
const finalSpan = document.getElementById(`finalScoreRound${gameCount}`);

// ---------- GAME SETUP FUNCTIONS ----------

/* 
These two button functions set the value of the html <button> 
    elements to enabled or disabled, respectively.
*/
function enableButton( buttonName ) {
    buttonName.disabled = false;
}
function disableButton( buttonName ) {
    buttonName.disabled = true;
}
// Locks the upper and final sum <span> elements
function lockSumSpan ( spanName ) {
    spanName.classList.add("locked");
}
/* 
This funtion resets the score table values.
    If the game is over, the table is overwritten to default.
    If the round is over it resets all unlocked elements to zero.
*/
function resetScoreTable() {
    if (resetValue === true) {
            scoreTable = { ...defaultScoreTable };
            console.log("Score table reset");
    } else {
        // Set all non-locked elements to zero
        for (const key in scoreTable) { 
            if (scoreTable.hasOwnProperty(key)) { 
                if (scoreTable[key].locked === false) { 
                    scoreTable[key].value = 0; 
                    console.log(`${key} Score Value: ${scoreTable[key].value}`);
                } 
            } 
        }    
    }
}
// Unsaves dice and resets their values to zero
function resetDiceState() {
    diceState = { ...defaultDiceState };
    diceValues = Array(5).fill(0);
    updateDiceDisplay();
    console.log("Dice state reset to default values!");
}
/* 
This function resets the html <span> and <div> elements.
    If the game is complete, all elements are reset.
    If the game is still running only unlocked elements
    will be reset.
*/
function resetElements() {
    const spanElements = document.querySelectorAll('span');
    const divElements = document.querySelectorAll('div');
    
    spanElements.forEach(span => {
        // Checks if there is a true flag for a full reset (initialize game only)
        if ( resetValue ) {
            span.classList.remove("locked");
            span.classList.remove("saved");
            span.textContent = '0';

        // Checks if there is a false flag for a round reset, locks in any saved spans
        } else if ( span.classList.contains("saved") && resetValue===false ){ 
            span.classList.remove("saved");
            span.classList.add("locked"); 
        
        // Reset everything that is not locked, and is not the upper or final sum
        } else if (!(span.id === `finalScoreRound${gameCount}` || span.id === `upperScoreRound${gameCount}` ) && !(span.classList.contains("locked")) && resetValue===false) {
            span.textContent = '0';
        }
    });
    // Removes a saved lock from all dice
    divElements.forEach(div => {
        div.classList.remove("saved");
    });
    // Reset turns
    turnRollCounter = 1;
    console.log(`Turn #: ${turnRollCounter}`);

}

// ---------- GAME INITIALIZATION FUNCTIONS ----------

// Ensures the html is fully loaded before beginning the game.
document.addEventListener('DOMContentLoaded', () => {
    disableButton( rollButton );
    disableButton( reRollButton );
    disableButton( scoreButton );
    initializeGame();
});
/* 
This function sets a fresh score and dice at the start of a game.
*/
function initializeGame() {
    resetValue = true;
    resetDiceState();
    resetScoreTable();
    resetElements();
    updateDiceDisplay();
    lockSumSpan(upperSpan);
    lockSumSpan(finalSpan);
    console.log("New game started!");
    enableButton( rollButton );
    resetValue = false;
}
// Finishes the game for a single-player game
function endGame() {
    // Increment the gamecount to fill the rest of the score sheet
    gameCount += 1;
    // Pop-up to inquire about multiple rounds.
    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        initializeGame();
    } else {
        alert("Thank you for playing!");
    }
}

// ---------- GAME BOARD OPERATION FUNCTIONS ----------

// Initial generation of five random dice
function rollFiveDice() {
    let diceVal = "";
    for (let i = 0; i < 5; i++) {
        diceVal = `dice${i+1}Value`;
        diceState[diceVal] = rollDice();
        diceValues[i] = diceState[diceVal];
    }
    updateDiceDisplay();
}
/* 
Param obj - The diceState object
Description - This function generates dice rolls for the dice that have not
    been saved. Lock values in the diceState uobject prevent this.
*/
function reRollDice(obj) {
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
            valKey = `${key}Value`;
            obj[valKey] = rollDice();
            diceValues[keyIndexMap[key]] = obj[valKey];
        }
    }
    updateDiceDisplay();
}
/* 
This function updates the dice image with the current rolled value, ignoring
    dice that have been saved.
*/
function updateDiceDisplay() { 
    for ( let i = 0; i < diceValues.length; i++ ) {
        let dieId = `dice${i+1}`;
        // Assign the dice array value to the unsaved dice icon.
        if ( !document.getElementById(dieId).classList.contains("saved") ) {
            document.getElementById(dieId).innerText = diceValues[i];
        }
    }
}

/*
Param bool - boolean value to indicate whether the score button has been clicked
Description - This function calls yatzyTestingFunction to calculate the score table
    and then displayScoreTable publishes the results.
*/
function calculateScore( bool ) {
    yatzyTestingFunction( diceValues, scoreTable );
    displayScoreTable( gameCount, scoreTable, bool );
}

// ---------- ON-CLICK LISTENERS & CLICK EXECUTION ----------

/*
Click listeners for the three buttons.

rollButton will roll all dice, update dice, calculte the potential scoring
    of the dice, disable itself, and enable the other two buttons.

rerollButton will roll any unsaved dice, update dice, calculte the potential scoring
    of the dice, and disable itself after a total of 3 rolls have been completed.

scoreButton will disable itself and the rerollButton, enable the roll button, 
    reset the unlocked elements, reset the dice, and update the upper and final
    scores. It will then update the round counter, and invoke endGame after 15 rounds.
*/ 
rollButton.addEventListener('click', () => {
    rollFiveDice();
    updateDiceDisplay();
    calculateScore( false );
    enableButton( scoreButton );
    disableButton( rollButton );
    enableButton( reRollButton );
    turnRollCounter += 1;
    console.log(`Turn #: ${turnRollCounter}`);
});

reRollButton.addEventListener('click', () => {
    reRollDice( diceState );
    updateDiceDisplay();
    calculateScore( false );
    turnRollCounter += 1;
    console.log(`Turn #: ${turnRollCounter}`);
    if (turnRollCounter > 3) {
        disableButton( reRollButton );
    }
});

scoreButton.addEventListener('click', () => {
    disableButton( scoreButton );
    enableButton( rollButton );
    disableButton( reRollButton );
    scoreTable["upper"].locked = false;
    scoreTable["final"].locked = false;
    console.log(`Pre-reset scoreTable: ${JSON.stringify(scoreTable)}`);
    console.log(`Turn #: ${turnRollCounter}`);
    resetElements();
    resetDiceState();
    calculateScore( true );
    console.log(`Turn #: ${turnRollCounter}`);
    roundCount += 1;
    console.log(`Round #: ${roundCount}`);
    scoreTable["upper"].locked = true;
    scoreTable["final"].locked = true;
    console.log(`Post-reset scoreTable: ${JSON.stringify(scoreTable)}`);
    if (roundCount > maxRounds) endGame();
});

/*
Click listener for <div> and <span> elements
Invokes the handleClick function.
 */

spanElements.forEach(span => {
    span.addEventListener('click', (event) => {
        handleClick(event, 'span');
    });
});

divElements.forEach(div => {
    div.addEventListener('click', (event) => {
        handleClick(event, 'div');
    });
});

/*
Params event - the event invoked by the click
       type - the element type that was clicked
Description - Invokes click to save with the harvested element ID
 */
function handleClick(event, type) { 
    const elementId = event.target.id; 
    clickToSave(elementId); 
    console.log(`${type} element clicked with ID: ${elementId}`); 
}

/*
Param elementId - the ID of the clicked element
Description - Saves the clicked element with a saved class so the value
    assigned to it will not be changed by the subsequent action. Also locks 
    the array of the dice state or the scoreTable object value.
*/
function clickToSave(elementId) {
    const elementType = document.getElementById(elementId);
    const tableKey = elementId.slice(0,-11);
    // Saves an unsaved item on click
    if ((!elementType.classList.contains('saved'))) {
        elementType.classList.add("saved");
        
        if ( diceState.hasOwnProperty(elementId) ) {
            diceState[elementId] = true;
        
        } else if (scoreTable.hasOwnProperty(tableKey)) {
            scoreTable[tableKey].locked = true;
        }
    // Removes the saved state on a saved item on click
    } else {
        elementType.classList.remove("saved");
        
        if ( diceState.hasOwnProperty(elementId) ) {
            diceState[elementId] = false;
        
        } else if (scoreTable.hasOwnProperty(tableKey)) {
            scoreTable[tableKey].locked = false;
        }
    }
}
