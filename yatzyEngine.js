

function oneTotals( array ) {
    let total = 0;
    for (let x in array) {
        if (x.dieValue == 1) {
            total += x.dieValue;
        }
    }
    return total;
}

function twoTotals( array ) {
    let total = 0;
    for (let x in array) {
        if (x.dieValue == 2) {
            total += x.dieValue;
        }
    }
    return total;
}

function threeTotals( array ) {
    let total = 0;
    for (let x in array) {
        if (x.dieValue == 3) {
            total += x.dieValue;
        }
    }
    return total;
}

function fourTotals( array ) {
    let total = 0;
    for (let x in array) {
        if (x.dieValue == 4) {
            total += x.dieValue;
        }
    }
    return total;
}

function fiveTotals( array ) {
    let total = 0;
    for (let x in array) {
        if (x.dieValue == 5) {
            total += x.dieValue;
        }
    }
    return total;
}

function sixTotals( array ) {
    let total = 0;
    for (let x in array) {
        if (x.dieValue == 6) {
            total += x.dieValue;
        }
    }
    return total;
}

function subtotalAndBonus ( array ) {
    let total = 0;
    let bonus = 0;
    sum = array.map(e => total += e);
    if (sum >= 63) {
        bonus += 50;
    }
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

    return sum;
}

function threeOfAKind( array ) {
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

    return sum;
}

function fourOfAKind( array ) {
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

    return sum;
}

function smallStraight( array ) {
    array.sort((a, b) => a - b);
    let consecutiveCount = 1;
    
    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1] + 1) {
            consecutiveCount++;
            if (consecutiveCount === 4) {
                // TODO: return the sum of the straight
                return true;  // Found a small straight
            }
        } else if (array[i] !== array[i - 1]) {
            consecutiveCount = 1;  // Reset if not consecutive
        }
    }
    
    return false;  // No small straight found
}

function largeStraight( array ) {
    array.sort((a, b) => a - b);
    let consecutiveCount = 1;
    
    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1] + 1) {
            consecutiveCount++;
            if (consecutiveCount === 5) {
                // TODO: return the sum of the straight
                return true;  // Found a large straight
            }
        } else if (array[i] !== array[i - 1]) {
            consecutiveCount = 1;  // Reset if not consecutive
        }
    }
    
    return false;  // No large straight found
}

function fullHouse() {
    // some code
}

function chance(array) {
    let total = 0;
    let sum = array.map(e => total += e);
    return sum;
}

function yatzyRoll( array ) {
    let flag = false;
    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1]) {
            flag = true;
        } else {
            return false;
        }
    }
    if (flag == true) {
        let total = 0;
        let sum = array.map(e => total += e);
        return sum;
    }
}

function finalScore( array ) {
    let total = 0;
    let sum = array.map(e => total += e);
    return sum;
}






