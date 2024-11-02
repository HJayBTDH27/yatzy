const diceValues = [];
const diceIdValues = ["dice1", "dice2","dice3","dice4","dice5"];
const totalScore = 0;
const savedDice = [];
const rollCounter = 0;
const dieArray = [];
const dieHistory = [];


function initializeGame() {
    // set or reset scores and dice to play a new game
    diceValues = [];
    totalScore = 0;
    savedDice = [];
    rollCounter = 0;
    // initialize 5 dice objects from the die class
    // const dice1 = new die("dice1");
    // const dice2 = new die("dice2");
    // const dice3 = new die("dice3");
    // const dice4 = new die("dice4");
    // const dice5 = new die("dice5");
    for (let x in diceIdValues) {
        dieArray[x] = new die (diceIdValues[x]);
    }
}

// function updateDiceDisplay() {
//     document.getElementById("dice1").innerText = diceValues[0];
//     document.getElementById("dice2").innerText = diceValues[1];
//     document.getElementById("dice3").innerText = diceValues[2];
//     document.getElementById("dice4").innerText = diceValues[3];
//     document.getElementById("dice5").innerText = diceValues[4];
// }

function startGame() {
    diceValues = diceValues.concat(multiRoll(5, diceIdValues));
    for (let x = 0; x < diceValues.length; x++) {
        dieArray[x].dieValue = diceValues[x];
        altTextWriter( x );
        rollHistory( x );
    }
    rollCounter += 1;
    updateDiceDisplay();
}

function clickToSaveDie( id ) {
    dieArray[id].saved = true;
    savedDice.push(id);
    console.log(savedDice);
    // dieObject saved = true
    // add code to highlight selected die with css
}

function reRoll() {
    let diceNumbers = 5 - savedDice.length;
    let tempArray = multiRoll(diceNumbers, );
    let counter = 0;
    for (let i = 0; i < dieArray.length; i++) {
        if (dieArray[i].saved == false && counter < diceNumbers) {
            diceValues[i] = tempArray[counter];
            rollHistory(tempArray[counter]);
            counter += 1;
        }
        else {
            break;
        }
    }
    rollCounter += 1;
    updateDiceDisplay();
}

function rollHistory( die ) {
    dieHistory.push(die);
}