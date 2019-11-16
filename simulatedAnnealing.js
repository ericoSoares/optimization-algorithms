const ITEMS = [
    { name: 'item1', value: 878, weight: 20 },
    { name: 'item2', value: 269, weight: 10 },
    { name: 'item3', value: 20, weight: 4 },
    { name: 'item4', value: 11, weight: 4 },
    { name: 'item5', value: 375, weight: 15 },
    { name: 'item6', value: 60, weight: 10 },
    { name: 'item7', value: 50, weight: 7 },
    { name: 'item8', value: 321, weight: 23 },
    { name: 'item9', value: 80, weight: 5 },
    { name: 'item10', value: 879, weight: 20 }
];
const INITIAL_SOLUTION = ITEMS.map(r => '0').join('');
const MAX_WEIGHT = 50;
const TEMP_MIN = 0;
const COOLING_RATE = 0.01;
const INITIAL_TEMP = 1000;

function generateRandomNeighbour(solution) {
    let splitSol = solution.split('');
    let randomIndex = Math.floor(Math.random() * (splitSol.length));

    splitSol[randomIndex] = splitSol[randomIndex] == '0' ? '1' : '0';
    return splitSol.join('');
}

function convertBitSolution(bits) {
    let returnList = [];
    let splitBits = bits.split('');
    for(let i = 0; i < splitBits.length; i++) {
        if(splitBits[i] == '0') continue;
        returnList.push(ITEMS[i]);
    }
    return returnList;
}

function getEnergy(solution) {
    let result = 0;
    let totalWeight = 0;
    let splitSolution = solution.split('');
    for(let i = 0; i < splitSolution.length; i++) {
        if(splitSolution[i] == '0') continue;
        result += ITEMS[i].value;
        totalWeight += ITEMS[i].weight;
    }

    return totalWeight > MAX_WEIGHT ? Number.POSITIVE_INFINITY : result * -1;
}

function simulatedAnnealing() {
    let currentTemp = INITIAL_TEMP;
    let lastState = INITIAL_SOLUTION;
    let lastEnergy = getEnergy(lastState);

    let bestState = lastState;
    let bestEnergy = lastEnergy;

    while(currentTemp > TEMP_MIN) {
        let currentState = generateRandomNeighbour(lastState);
        let currentEnergy = getEnergy(currentState);

        if(currentEnergy < lastEnergy) {
            lastState = currentState;
            lastEnergy = currentEnergy;
        } else {
            if(Math.random() <= Math.exp(-(currentEnergy - lastEnergy)/currentTemp)) {
                lastState = currentState;
                lastEnergy = currentEnergy;
            }
        }

        if(bestEnergy > lastEnergy) {
            bestState = lastState;
            bestEnergy = lastEnergy;
        }
        currentTemp -= COOLING_RATE;
    }
    return bestState;
}

(function() {
    let solution = simulatedAnnealing();
    console.log(solution);
    console.log(convertBitSolution(solution));

})();