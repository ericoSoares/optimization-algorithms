// Constantes de entrada
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
const MAX_ITER = 1000000;
const MAX_TABU_SIZE = 15;
const MAX_WEIGHT = 269;

// Gera lista com todos os vizinhos de uma solução
function getNeighbors(solution) {
    let neighList = [];

    let invertBit = (bit) => bit == '1' ? '0' : '1';

    for (let i = 0; i < solution.length; i++) {
        neighList.push(solution.substr(0, i) + invertBit(solution.charAt(i)) + solution.substr(i + 1));
    }

    return neighList;
}

// Converte de array de bits para array de itens
function convertBitSolution(bits) {
    let returnList = [];
    let splitBits = bits.split('');
    for (let i = 0; i < splitBits.length; i++) {
        if (splitBits[i] == '0') continue;
        returnList.push(ITEMS[i]);
    }
    return returnList;
}

// Fitness: calcula o valor total da solução e retorna ele ou -infinito caso ultrapasse o valor da mochila
function fitness(solution) {
    let result = 0;
    let totalWeight = 0;
    let splitSolution = solution.split('');

    for (let i = 0; i < splitSolution.length; i++) {
        if (splitSolution[i] == '0') continue;
        result += ITEMS[i].value;
        totalWeight += ITEMS[i].weight;
    }

    return totalWeight > MAX_WEIGHT ? Number.NEGATIVE_INFINITY : result;
}

// Realize busca tabu
function tabuSearch() {
    let bestSolution = INITIAL_SOLUTION;
    let bestCandidate = INITIAL_SOLUTION;
    let tabuList = [INITIAL_SOLUTION];

    let curIteration = 0;
    while (curIteration < MAX_ITER) {
        curIteration++;

        let neighbors = getNeighbors(bestCandidate);
        for (sCandidate of neighbors) {
            if (!tabuList.includes(sCandidate) && (fitness(sCandidate) > fitness(bestCandidate))) {
                bestCandidate = sCandidate;
            }
        }

        if (fitness(bestCandidate) > fitness(bestSolution)) {
            bestSolution = bestCandidate;
        }

        tabuList.push(bestCandidate);
        if (tabuList.length > MAX_TABU_SIZE) {
            tabuList.shift()
        }
    }
    return bestSolution;
}

// Main e printagem
(function () {
    let solution = tabuSearch();
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
