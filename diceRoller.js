//  -- DEPRECATED --
// const diceIdValues = ["dice1", "dice2","dice3","dice4","dice5"];

// class die {
//     constructor(id) {
//         this.dieId = id;
//         this.dieValue = 0;
//         this.altText = "Die value rolled is ";
//         this.dieImage = "images/" + id + ".png";
//         this.saved = false;
//     }
//     altTextWriter(valueToWrite) {
//         this.altText = this.altText + valueToWrite;
//     }
//     function rollDice() {
//         return Math.floor(Math.random() * 6) + 1;
//     }
// };
//  -- DEPRECATED --

const diceArray = [];
let yatzyArray = []
let rollCount = 0;

function rollDice() {
    let x = Math.floor(Math.random() * 6) + 1;
    rollCount += 1;
    diceArray.push(x);
    if (diceArray.length > 5) yatzyArray = diceArray.slice(-5);
    else yatzyArray.push(x);
    displayResults();
    return x;
}

function getDiceArray() {
    return diceArray;
}

function getYatzyArray() {
    return yatzyArray;
}

function getRollCount() {
    return rollCount;
}

function displayResults() {
    document.getElementById('diceArray').textContent = `Dice Array: ${getDiceArray().join(', ')}`;
    document.getElementById('yatzyArray').textContent = `Yatzy Array: ${getYatzyArray().join(', ')}`;
    document.getElementById('rollCount').textContent = `Roll Count: ${getRollCount()}`;
}

//  -- DEPRECATED --
// Run the displayResults function when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded',  displayResults);
// document.addEventListener('click',  displayResults);



// function multiRoll(diceAmount) {
//     const diceArray = [];
//     for (let i = 0; i < diceAmount; i++) {
//         diceArray[i] = rollDice();
//     }
//     return diceArray;
// }
//  -- DEPRECATED --

