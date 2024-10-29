

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

function onePair() {
    // some code
}

function twoPair() {
    // some code
}

function threeOfAKind() {
    // some code
}

function fourOfAKind() {
    // some code
}

function smallStraight() {
    // some code
}

function largeStraight() {
    // some code
}

function fullHouse() {
    // some code
}

function chance(array) {
    let total = 0;
    let sum = array.map(e => total += e);
    return sum;
}

function finalScore() {
    // some code
}






