function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

const diceArray = [];

function multiRoll( diceAmount ) {
    for (let i = 0; i < diceAmount; i++) {
        diceArray[i] = rollDice();
    }
    return diceArray;
}