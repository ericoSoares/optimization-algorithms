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
const MAX_ITER = 1000;
const MAX_TABU_SIZE = 10;
const MAX_WEIGHT = 50;

function getNeighbors(solution) {
    let neighList = [];

    let invertBit = (bit) => bit == '1' ? '0' : '1';

    for(let i = 0; i < solution.length; i++) {
        neighList.push(solution.substr(0, i) + invertBit(solution.charAt(i)) + solution.substr(i + 1));
    }

    return neighList;
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

function fitness(solution) {
    let result = 0;
    let totalWeight = 0;
    let splitSolution = solution.split('');

    for(let i = 0; i < splitSolution.length; i++) {
        if(splitSolution[i] == '0') continue;
        result += ITEMS[i].value;
        totalWeight += ITEMS[i].weight;
    }

    return totalWeight > MAX_WEIGHT ? Number.NEGATIVE_INFINITY : result;
}

function tabuSearch() {
    let bestSolution = INITIAL_SOLUTION;
    let bestCandidate = INITIAL_SOLUTION;
    let tabuList = [INITIAL_SOLUTION];

    let curIteration = 0;
    while(curIteration < MAX_ITER) {
        curIteration++;

        let neighbors = getNeighbors(bestCandidate);
        for(sCandidate of neighbors) {
            if(!tabuList.includes(sCandidate) && (fitness(sCandidate) > fitness(bestCandidate))) {
                bestCandidate = sCandidate;
            }
        }

        if(fitness(bestCandidate) > fitness(bestSolution)) {
            bestSolution = bestCandidate;
        }

        tabuList.push(bestCandidate);
        if(tabuList.length > MAX_TABU_SIZE) {
            tabuList.shift()
        }
    }
    return bestSolution;
}

(function () {
    let solution = tabuSearch();
    console.log(solution);
    console.log(convertBitSolution(solution))
})();
