const scoreTable = {
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
}

function updateScore(category, score) {
    if (scoreTable.hasOwnProperty(category)) {
        scoreTable[category] = score;
    } else {
        console.log("Invalid category");
    }
}

function oneTotals(array) {
    let total = 0;
    for (let x in array) {
        if (x == 1) {
            total += x;
        }
    }
    updateScore("ones", total);
    return total;
}

function twoTotals(array) {
    let total = 0;
    for (let x in array) {
        if (x == 2) {
            total += x;
        }
    }
    updateScore("twos", total);
    return total;
}

function threeTotals(array) {
    let total = 0;
    for (let x in array) {
        if (x == 3) {
            total += x;
        }
    }
    updateScore("threes", total);
    return total;
}

function fourTotals(array) {
    let total = 0;
    for (let x in array) {
        if (x == 4) {
            total += x;
        }
    }
    updateScore("fours", total);
    return total;
}

function fiveTotals(array) {
    let total = 0;
    for (let x in array) {
        if (x == 5) {
            total += x;
        }
    }
    updateScore("fives", total);
    return total;
}

function sixTotals(array) {
    let total = 0;
    for (let x in array) {
        if (x == 6) {
            total += x;
        }
    }
    updateScore("sixes", total);
    return total;
}

function subtotalAndBonus(array) {
    let bonus = 0;
    let sum = Object.values(scoreTable).slice(0, 6).reduce((acc, curr) => acc + curr, 0);
    updateScore("finalScore", sum);
    if (sum >= 63) {
        bonus += 50;
    }
    updateScore("upperScore", sum);
    updateScore("bonus", bonus);
    return sum, bonus;
}

function onePairTwoPair( array ) {
    const numberCount = {};
    let sum = 0;

    for (let number of array) {
        numberCount[number] = (numberCount[number] || 0) + 1;
    }

    for (let [number, count] of Object.entries(numberCount)) {
        if (count >= 2) {
            sum += Number(number) * 2;
        }
    }
    // TODO: Fix this up
    updateScore("onePair", sum);
    return sum;
}

function threeOfAKind(array) {
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
    updateScore("threeOfAKind", sum);
    return sum;
}

function fourOfAKind(array) {
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
    updateScore("fourOfAKind", sum);
    return sum;
}

function smallStraight(array) {
    array.sort((a, b) => a - b);
    let consecutiveCount = 1;
    let sum = array[0]; // Start with the first number

    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1] + 1) {
            consecutiveCount++;
            sum += array[i];
            if (consecutiveCount === 4) {
                updateScore("smallStraight", sum);
                return sum;  // Found a small straight
            }
        } else if (array[i] !== array[i - 1]) {
            consecutiveCount = 1;  // Reset if not consecutive
            sum = array[i]; // Reset sum with the current number
        }
    }
    updateScore("smallStraight", 0);
    return 0;  // No small straight found
}

function largeStraight(array) {
    array.sort((a, b) => a - b);
    let consecutiveCount = 1;
    let sum = array[0]; // Start with the first number

    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1] + 1) {
            consecutiveCount++;
            sum += array[i];
            if (consecutiveCount === 5) {
                updateScore("smallStraight", sum);
                return sum;  // Found a large straight
            }
        } else if (array[i] !== array[i - 1]) {
            consecutiveCount = 1;  // Reset if not consecutive
            sum = array[i]; // Reset sum with the current number
        }
    }
    updateScore("largeStraight", 0);
    return 0;  // No large straight found
}

function isFullHouse(array) {
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

function sumFullHouse(array) {
    if (isFullHouse(array)) {
        let x = array.reduce((sum, number) => sum + number, 0);
        updateScore("fullHouse", x);
        return x;
    }
    return 0;
}

function chance(array) {
    let total = 0;
    let sum = array.reduce((total, number) => total + number, 0);
    updateScore("chance", sum);
    return sum;
}

function yatzyRoll(array) {
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
        updateScore("yatzy", total);
        return total;
    }
}

function finalScore( array ) {    
    let sum = Object.values(array).reduce((acc, score) => acc + score, 0);
    updateScore("finalScore", sum);
    return sum;
}


function yatzyTestingFunction( ar ) {
    oneTotals( ar );
    twoTotals( ar );
    threeTotals( ar );
    fourTotals( ar );
    fiveTotals( ar );
    sixTotals( ar );
    subtotalAndBonus( scoreTable );
    onePairTwoPair( ar );
    threeOfAKind( ar );
    fourOfAKind( ar );
    sumFullHouse( ar );
    smallStraight( ar );
    largeStraight( ar );
    yatzyRoll( ar );
    chance( ar );
    finalScore(scoreTable);
}

function displayScoreTable() {
    const scoreTableDiv = document.getElementById('scoreDisplay');
    scoreTableDiv.innerHTML = '';  // Clear any existing content

    for (let category in scoreTable) {
        const p = document.createElement('p');
        p.textContent = `${category}: ${scoreTable[category]}`;
        scoreTableDiv.appendChild(p);
    }
}
document.addEventListener('DOMContentLoaded', displayScoreTable);
document.addEventListener('click',  () => {
    yatzyTestingFunction(getYatzyArray());
    displayScoreTable();
});





