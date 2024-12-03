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
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const path = require('path'); 

app.use(cors());
app.use(express.json());

app.get('/roll-dices', (req, res) => {
    let diceValues = [0,0,0,0,0];

    function rollDice() {
        let x = Math.floor(Math.random() * 6) + 1;
        return x;
    }

    function rollFiveDice() {
        let array = [0,0,0,0,0];
        for (let i = 0; i < 5; i++) {
            array[i] = rollDice();
        }
        return array;
    }
    diceValues = [...rollFiveDice()];

    res.json({diceValues});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



