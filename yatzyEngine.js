export {
    onePairTwoPair, oneTotals, twoTotals, threeOfAKind, threeTotals,
    fourOfAKind, fourTotals, fiveTotals, sixTotals, subtotalAndBonus,
    smallStraight, largeStraight, sumFullHouse, chance, yatzyRoll,
    finalScore, yatzyTestingFunction, displayScoreTable, defaultScoreTable
};

/* -- DEPRECATED -- const defaultScoreTable = {
    "ones": 0,
    "twos": 0,
    "threes": 0,
    "fours": 0,
    "fives": 0,
    "sixes": 0,
    "upperScore": 0,
    "bonus": 0,
    "onePair": 0,
    "twoPair": 0,
    "threeOfAKind": 0,
    "fourOfAKind": 0,
    "fullHouse": 0,
    "smallStraight": 0,
    "largeStraight": 0,
    "yatzy": 0,
    "chance": 0,
    "finalScore": 0
} */
// -- JS object holding the names as a key, with nested objects to hold score values and lock the values in
const defaultScoreTable = {
    "ones": { value: 0, locked: false },
    "twos": { value: 0, locked: false },
    "threes": { value: 0, locked: false },
    "fours": { value: 0, locked: false },
    "fives": { value: 0, locked: false },
    "sixes": { value: 0, locked: false },
    "upper": { value: 0, locked: true },
    "bonus": { value: 0, locked: false },
    "onePair": { value: 0, locked: false },
    "twoPair": { value: 0, locked: false },
    "threeOfAKind": { value: 0, locked: false },
    "fourOfAKind": { value: 0, locked: false },
    "fullHouse": { value: 0, locked: false },
    "smallStraight": { value: 0, locked: false },
    "largeStraight": { value: 0, locked: false },
    "yatzy": { value: 0, locked: false },
    "chance": { value: 0, locked: false },
    "final": { value: 0, locked: true }
};

/* 
 * Params: category - String - Key of the corresponding scoreTable
 *         score - Number - Calculated score from selected dice
 *         table - Object - scoreTable object to hold the values for display
 * Returns: void
 * Description: a method to place the calculated score into the appropriate value of the object. */

function updateScore(category, score, table) {
    if (table.hasOwnProperty(category)) {
        if (table[category].locked === false) {
            table[category].value = score;
        } else {
            console.log(`${category} is locked and cannot be updated.`);
        }
    } else { 
        console.log("Invalid category"); 
    }
}
// -- SCORE CALCULATION FUNCTIONS CORRESPONDING TO THEIR TABLE VALUES --
// -- Params: ar - array - The values of the five dice that have been rolled
// --         table - Object - the scoreTable that will be updated.

function oneTotals(ar, table) {
    let array = [...ar];
    let total = 0;
    for (let x of array) {
        if (x == 1) {
            total += x;
        }
    }
    updateScore("ones", total, table);
    console.log("Ones");
    return total;
}

function twoTotals(ar, table) {
    let array = [...ar];
    let total = 0;
    for (let x of array) {
        if (x == 2) {
            total += x;
        }
    }
    updateScore("twos", total, table);
    console.log("twos");
    return total;
}

function threeTotals(ar, table) {
    let array = [...ar];
    let total = 0;
    for (let x of array) {
        if (x == 3) {
            total += x;
        }
    }
    updateScore("threes", total, table);
    console.log("threes");
    return total;
}

function fourTotals(ar, table) {
    let array = [...ar];
    let total = 0;
    for (let x of array) {
        if (x == 4) {
            total += x;
        }
    }
    updateScore("fours", total, table);
    console.log("fours");
    return total;
}

function fiveTotals(ar, table) {
    let array = [...ar];
    let total = 0;
    for (let x of array) {
        if (x == 5) {
            total += x;
        }
    }
    updateScore("fives", total, table);
    console.log("fives");
    return total;
}

function sixTotals(ar, table) {
    let array = [...ar];
    let total = 0;
    for (let x of array) {
        if (x == 6) {
            total += x;
        }
    }
    updateScore("sixes", total, table);
    console.log("sixes");
    return total;
}

function subtotalAndBonus( table ) {
    // let array = [...ar];
    const firstSixValues = Object.keys(defaultScoreTable) .slice(0, 6) .map(key => defaultScoreTable[key].value);
    let array = [...firstSixValues];
    let bonus = 0;
    let sum = Object.values(array).slice(0, 6).reduce((acc, curr) => acc + curr, 0);
    // updateScore("finalScore", sum, table);
    if (sum >= 63) {
        bonus += 50;
    }
    updateScore("upper", sum, table);
    updateScore("bonus", bonus, table);
    console.log("Upper Score/Bonus");
    return sum, bonus;
}

function onePairTwoPair(ar, table) {
    let array = [...ar];
    const numberCount = {};
    let sum = 0;
    let tally = 0;
    for (let number of array) {
        numberCount[number] = (numberCount[number] || 0) + 1;
    }

    for (let [number, count] of Object.entries(numberCount)) {
        if (count >= 2) {
            tally += 1;
            sum += Number(number) * 2;
        }
    }
    if (tally > 1) {
        updateScore("twoPair", sum, table);
        console.log("twopair");
        return;
    }
    else {
        updateScore("onePair", sum, table);
        console.log("Onepair");
        return;
    }
}

function threeOfAKind(ar, table) {
    let array = [...ar];
    const numberCount = {};
    let sum = 0;

    for (let number of array) {
        numberCount[number] = (numberCount[number] || 0) + 1;
    }

    for (let [number, count] of Object.entries(numberCount)) {
        if (count >= 3) {
            sum += Number(number) * 3;
        }
    }
    updateScore("threeOfAKind", sum, table);
    console.log("three of a kind");
    return sum;
}

function fourOfAKind(ar, table) {
    let array = [...ar];
    const numberCount = {};
    let sum = 0;

    for (let number of array) {
        numberCount[number] = (numberCount[number] || 0) + 1;
    }

    for (let [number, count] of Object.entries(numberCount)) {
        if (count >= 4) {
            sum += Number(number) * 4;
        }
    }
    updateScore("fourOfAKind", sum, table);
    console.log("four of a kind");
    return sum;
}

function smallStraight(ar, table) {
    let array = [...ar];
    array.sort((a, b) => a - b);
    let consecutiveCount = 1;
    let sum = array[0]; // Start with the first number

    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1] + 1) {
            consecutiveCount++;
            sum += array[i];
            if (consecutiveCount === 4) {
                updateScore("smallStraight", sum, table);
                return sum;  // Found a small straight
            }
        } else if (array[i] !== array[i - 1]) {
            consecutiveCount = 1;  // Reset if not consecutive
            sum = array[i]; // Reset sum with the current number
        }
    }
    updateScore("smallStraight", 0, table);
    console.log("small straight");
    return 0;  // No small straight found
}

function largeStraight(ar, table) {
    let array = [...ar];
    array.sort((a, b) => a - b);
    let consecutiveCount = 1;
    let sum = array[0]; // Start with the first number

    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1] + 1) {
            consecutiveCount++;
            sum += array[i];
            if (consecutiveCount === 5) {
                updateScore("smallStraight", sum, table);
                return sum;  // Found a large straight
            }
        } else if (array[i] !== array[i - 1]) {
            consecutiveCount = 1;  // Reset if not consecutive
            sum = array[i]; // Reset sum with the current number
        }
    }
    updateScore("largeStraight", 0, table);
    console.log("large straight");
    return 0;  // No large straight found
}

function isFullHouse(ar, table) {
    let array = [...ar];
    if (array.length !== 5) return false;

    const numberCount = {};

    for (let number of array) {
        numberCount[number] = (numberCount[number] || 0) + 1;
    }

    let hasThreeOfAKind = false;
    let hasPair = false;

    for (let count of Object.values(numberCount)) {
        if (count === 3) hasThreeOfAKind = true;
        if (count === 2) hasPair = true;
    }

    return hasThreeOfAKind && hasPair;
}

function sumFullHouse(ar, table) {
    let array = [...ar];
    if (isFullHouse(array)) {
        let x = array.reduce((sum, number) => sum + number, 0);
        updateScore("fullHouse", x, table);
        console.log("full house");
        return x;
    }
    return 0;
}

function chance(ar, table) {
    let array = [...ar];
    let total = 0;
    let sum = array.reduce((total, number) => total + number, 0);
    updateScore("chance", sum, table);
    console.log("chance");
    return sum;
}

function yatzyRoll(ar, table) {
    let array = [...ar];
    let flag = false;
    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1]) {
            flag = true;
        } else {
            return false;
        }
    }
    if (flag == true) {
        let total = 50;
        updateScore("yatzy", total, table);
        console.log("yatzy!");
        return total;
    }
}

function finalScore( table ) {
    // let array = [...ar];
    const upperValues = Object.keys(table).slice(0, 6).map(key => table[key].value);
    const lowerValues = Object.keys(table) .slice(8, 17).map(key => table[key].value);
    let array = [...upperValues, ...lowerValues];
    let sum = Object.values(array).reduce((acc, score) => acc + score, 0);
    updateScore("final", sum, table);
    console.log(`This is the total: ${sum}`);
    return sum;
}

/*
* Params: ar - Array - array of 5 dice values
*         table - Object - scoreTable object
* Description: Calls all scoreing functions to update the scoreTable
*/
function yatzyTestingFunction(ar, table) {
    oneTotals(ar, table);
    twoTotals(ar, table);
    threeTotals(ar, table);
    fourTotals(ar, table);
    fiveTotals(ar, table);
    sixTotals(ar, table);
    subtotalAndBonus( table );
    onePairTwoPair(ar, table);
    threeOfAKind(ar, table);
    fourOfAKind(ar, table);
    sumFullHouse(ar, table);
    smallStraight(ar, table);
    largeStraight(ar, table);
    yatzyRoll(ar, table);
    chance(ar, table);
    finalScore(table);
    console.log("Testing Function");
}

/*
* Params: gameValue - Number - The current game number (1-3) 
*         table - Object - the scoreTable we will be drawing values from
* Description: The method takes the scoreTable and inserts the key values 
*             into the appropriate <span> element in the Main html.
*/
function displayScoreTable(gameValue, table, bool) {
    const flag = bool;
    console.log(`The flag is set to ${flag}`);
    let roundString = `Round${gameValue}`; // + gameValue;

    if (table["bonus"].value != 0 && !document.getElementById(`bonusScoreRound${gameValue}`).classList.contains("locked")) {
        document.getElementById(`bonusScoreRound${gameValue}`).classList.add("locked");
        table["bonus"].locked = true;
        console.log(`Bonus ${gameValue} locked`);
    }

    for (const key in table) {
        if (table.hasOwnProperty(key)) {
            let element = document.getElementById(`${key}Score` + roundString);
            console.log(`Found element for ${key}Score${roundString}:`, element);
            // elements.forEach((element) => {
            //     console.log(`Processing key: ${key}`); 
            //     console.log(`Found elements for ${key}Score${roundString}:`, elements);
                
                if (!element.classList.contains('locked') ) { // --REMOVED-- && table[key].locked === false
                    element.textContent = table[key].value;
                } else if (element.classList.contains('locked') && (key === 'final' || key === 'upper') && flag) {
                    table[key].locked = false;
                    element.textContent = table[key].value;
                    console.log(`sum/final updated: ${table[key].value}`);
                    table[key].locked = true;
                }
            // });
        }
    }
    // totBonsArray.forEach((element) => {
    //     if (!element.classList.contains('locked')) { // --REMOVED-- && table[key].locked === false
    //         const key = element.id;
    //         console.log(`This is the key variable: ${key}`);
    //         // element.textContent = table[key].value;
    //         if (table.hasOwnProperty(key)) { 
    //             element.textContent = table[key].value; 
    //             console.log(`This is the .value variable: ${table[key].value}`);
    //         }
    //     }
    // });
    // console.log("Display");
}






