//  -- DEPRECATED -- This was an attempt to use A dice class to control the majority of the game. 
// -- it may be implemented at a later date
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
export { rollDice };

function rollDice() {
    let x = Math.floor(Math.random() * 6) + 1;
    return x;
}
//  -- DEPRECATED --
// function getDiceArray() {
//     return diceArray;
// }

// function getYatzyArray() {
//     return yatzyArray;
// }

// function getRollCount() {
//     return rollCount;
// }
//  -- DEPRECATED --


