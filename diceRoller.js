function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
    // let x = Math.floor(Math.random() * 6) + 1;
    // id.dieValue = x;
    // id.altText = altText + x;
    // console.log(die);
}



function multiRoll( diceAmount) {
    const diceArray = [];
    for (let i = 0; i < diceAmount; i++) {
        diceArray[i] = rollDice();
    }
    return diceArray;
}

