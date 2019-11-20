const ITEMS = [
    { name: 'item1',  weight: 95, value: 55 },
    { name: 'item2',  weight: 4,  value: 10 },
    { name: 'item3',  weight: 60, value: 47 },
    { name: 'item4',  weight: 32, value: 5 },
    { name: 'item5',  weight: 23, value: 4 },
    { name: 'item6',  weight: 72, value: 50 },
    { name: 'item7',  weight: 80, value: 8 },
    { name: 'item8',  weight: 62, value: 61 },
    { name: 'item9',  weight: 65, value: 85 },
    { name: 'item10', weight: 46, value: 87 }
];
const INITIAL_SOLUTION = ITEMS.map(r => '0').join('');
const MAX_WEIGHT = 269;
const TEMP_MIN = 0;
const COOLING_RATE = 0.01;
const INITIAL_TEMP = 100000;

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
    let solutionArr = convertBitSolution(solution);
    console.log(solution);
    console.log(solutionArr);
    let finalWeight = solutionArr.reduce(function (a, b) {
        return { weight: a.weight + b.weight }; // returns object with property x
    });
    console.log("Peso final: ", finalWeight.weight);
    let finalValue = solutionArr.reduce(function (a, b) {
        return { value: a.value + b.value }; // returns object with property x
    });
    console.log("Valor final: ", finalValue.value);

})();