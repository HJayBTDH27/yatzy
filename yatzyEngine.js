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

const defaultScoreTable = {
    "ones": { value: 0, locked: false },
    "twos": { value: 0, locked: false },
    "threes": { value: 0, locked: false },
    "fours": { value: 0, locked: false },
    "fives": { value: 0, locked: false },
    "sixes": { value: 0, locked: false },
    "upperScore": { value: 0, locked: false },
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
    "finalScore": { value: 0, locked: false }
};

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

function subtotalAndBonus(ar, table) {
    let array = [...ar];
    let bonus = 0;
    let sum = Object.values(array).slice(0, 6).reduce((acc, curr) => acc + curr, 0);
    updateScore("finalScore", sum, table);
    if (sum >= 63) {
        bonus += 50;
    }
    updateScore("upperScore", sum, table);
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

function finalScore(ar, table) {
    let array = [...ar];
    let sum = Object.values(array).reduce((acc, score) => acc + score, 0);
    updateScore("finalScore", sum, table);
    console.log("Totes");
    return sum;
}


function yatzyTestingFunction(ar, table) {
    oneTotals(ar, table);
    twoTotals(ar, table);
    threeTotals(ar, table);
    fourTotals(ar, table);
    fiveTotals(ar, table);
    sixTotals(ar, table);
    subtotalAndBonus(ar, table);
    onePairTwoPair(ar, table);
    threeOfAKind(ar, table);
    fourOfAKind(ar, table);
    sumFullHouse(ar, table);
    smallStraight(ar, table);
    largeStraight(ar, table);
    yatzyRoll(ar, table);
    chance(ar, table);
    finalScore(ar, table);
    console.log("Testing Function");
}

function displayScoreTable(gameValue, table) {
    let roundString = "Round" + gameValue;
    const totBons = document.getElementsByClassName("total-score");
    const totBonsArray = Array.from(totBons);
    if (table["bonus"] != 0 && !document.getElementById(`bonusScoreRound${gameValue}`).classList.contains("locked")) {
        document.getElementById(`bonusScoreRound${gameValue}`).classList.set("locked");
        table["bonus"].locked = true;
    }
    for (const key in table) {
        if (table.hasOwnProperty(key)) {
            const elements = document.querySelectorAll(`#${key}Score` + roundString);
            elements.forEach((element) => {
                if (!element.classList.contains('locked') ) { // --REMOVED-- && table[key].locked === false
                    element.textContent = table[key].value;
                }
            });
/*  -- moved --          Array.from(totBons).forEach((element) => {
                if (!element.classList.contains('locked') ) { // --REMOVED-- && table[key].locked === false
                    element.textContent = table[key];
                }
            }); */
        }
    }
    totBonsArray.forEach((element) => {
        if (!element.classList.contains('locked')) { // --REMOVED-- && table[key].locked === false
            const key = element.id;
            // element.textContent = table[key].value;
            if (table.hasOwnProperty(key)) { 
                element.textContent = table[key].value; 
            }
        }
    });
    console.log("Display");
}






