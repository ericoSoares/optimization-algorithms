// Pega o input e converte para uma matriz quadrada para representar o grafo
function normalizeGraph(graph) {
	// Extrai menor e maior nodo
	let smallestVertice = graph[0][0];
	let biggestVertice = graph[graph.length - 1][0];

	// Cria a matriz que vai ser retornada, preenchendo ela com 0
	let finalGraph = [];
	for (let i = smallestVertice; i <= biggestVertice; i++) {
		finalGraph.push(new Array(biggestVertice).fill(0));
	}

	// Preenche os pesos na matriz de acordo com a entrada
	for (let i = 0; i < graph.length; i++) {
		let startingVert = graph[i][0];
		let endVert = graph[i][1];
		let weight = graph[i][2];
		finalGraph[startingVert - 1][endVert - 1] = weight;
	}
	return finalGraph;
}

function findMST(V, G) {
  // Cria matriz de adjascencia
  var adjMatrix = normalizeGraph(G);
  
  // Escolhe o vertice inicial (0)
  var vertex = 0;
  
  // Inicializa bordas e MST vazios
  var MST = [];
  var edges = [];
  var visited = [];
  var minEdge = [null,null,Infinity];
  
  // Roda o algoritmo de Prims até ter uma MST
  // que contém cada vertice do grafo
  while (MST.length !== V-1) {
    
    // Marca vertice atual como visitado
    visited.push(vertex);
    
    // Adiciona cada borda à lista de bordas possívels
    for (var r = 0; r < V; r++) {
      if (adjMatrix[vertex][r] !== 0) { 
        edges.push([vertex,r,adjMatrix[vertex][r]]); 
      }
    }

    // Encontra borda com o menor valor para um vertice que ainda não foi visitado
    for (var e = 0; e < edges.length; e++) {
      if (edges[e][2] < minEdge[2] && visited.indexOf(edges[e][1]) === -1) { 
        minEdge = edges[e]; 
      }
    }

    // Remove a borda escolhida do array de bordas
    edges.splice(edges.indexOf(minEdge), 1);

    // Insere borda na MST
    MST.push(minEdge);
      
    // Recomeça no novo vertice e reseta a borda minima
    vertex = minEdge[1];
    minEdge = [null,null,Infinity];
    
  }
  return MST;
}

// Grafo
let graph = [
	[
		1,
		2,
		30
	],
	[
		1,
		29,
		6
	],
	[
		2,
		3,
		46
	],
	[
		3,
		4,
		1
	],
	[
		4,
		5,
		28
	],
	[
		4,
		33,
		45
	],
	[
		4,
		27,
		27
	],
	[
		5,
		6,
		31
	],
	[
		5,
		7,
		8
	],
	[
		6,
		7,
		69
	],
	[
		6,
		63,
		83
	],
	[
		7,
		8,
		39
	],
	[
		8,
		9,
		14
	],
	[
		8,
		53,
		66
	],
	[
		8,
		52,
		31
	],
	[
		9,
		10,
		84
	],
	[
		9,
		99,
		28
	],
	[
		9,
		83,
		75
	],
	[
		9,
		48,
		92
	],
	[
		10,
		11,
		59
	],
	[
		11,
		12,
		10
	],
	[
		11,
		37,
		4
	],
	[
		12,
		13,
		28
	],
	[
		13,
		14,
		63
	],
	[
		13,
		8,
		77
	],
	[
		13,
		42,
		3
	],
	[
		14,
		15,
		9
	],
	[
		14,
		85,
		90
	],
	[
		15,
		16,
		100
	],
	[
		15,
		50,
		31
	],
	[
		15,
		69,
		46
	],
	[
		16,
		17,
		98
	],
	[
		16,
		79,
		96
	],
	[
		17,
		18,
		70
	],
	[
		18,
		19,
		94
	],
	[
		18,
		75,
		100
	],
	[
		19,
		20,
		22
	],
	[
		19,
		7,
		9
	],
	[
		19,
		92,
		70
	],
	[
		19,
		60,
		53
	],
	[
		20,
		21,
		14
	],
	[
		20,
		19,
		30
	],
	[
		20,
		93,
		35
	],
	[
		21,
		22,
		87
	],
	[
		21,
		81,
		34
	],
	[
		21,
		14,
		82
	],
	[
		22,
		23,
		82
	],
	[
		22,
		52,
		11
	],
	[
		23,
		24,
		55
	],
	[
		24,
		25,
		2
	],
	[
		24,
		59,
		63
	],
	[
		25,
		26,
		32
	],
	[
		25,
		99,
		19
	],
	[
		26,
		27,
		77
	],
	[
		26,
		32,
		26
	],
	[
		26,
		29,
		20
	],
	[
		27,
		28,
		95
	],
	[
		27,
		14,
		48
	],
	[
		28,
		29,
		29
	],
	[
		29,
		30,
		59
	],
	[
		30,
		31,
		91
	],
	[
		30,
		70,
		5
	],
	[
		30,
		57,
		37
	],
	[
		31,
		32,
		89
	],
	[
		31,
		69,
		53
	],
	[
		31,
		63,
		82
	],
	[
		32,
		33,
		50
	],
	[
		33,
		34,
		40
	],
	[
		33,
		49,
		77
	],
	[
		34,
		35,
		88
	],
	[
		34,
		94,
		52
	],
	[
		35,
		36,
		94
	],
	[
		35,
		80,
		46
	],
	[
		35,
		7,
		7
	],
	[
		35,
		60,
		5
	],
	[
		36,
		37,
		60
	],
	[
		37,
		38,
		21
	],
	[
		37,
		81,
		14
	],
	[
		38,
		39,
		89
	],
	[
		38,
		18,
		27
	],
	[
		38,
		16,
		70
	],
	[
		39,
		40,
		47
	],
	[
		39,
		76,
		89
	],
	[
		39,
		21,
		59
	],
	[
		40,
		41,
		63
	],
	[
		41,
		42,
		45
	],
	[
		41,
		44,
		80
	],
	[
		41,
		76,
		42
	],
	[
		42,
		43,
		46
	],
	[
		42,
		45,
		68
	],
	[
		42,
		57,
		5
	],
	[
		42,
		85,
		34
	],
	[
		43,
		44,
		24
	],
	[
		44,
		45,
		77
	],
	[
		44,
		12,
		56
	],
	[
		45,
		46,
		60
	],
	[
		45,
		68,
		19
	],
	[
		45,
		59,
		33
	],
	[
		46,
		47,
		45
	],
	[
		47,
		48,
		50
	],
	[
		48,
		49,
		93
	],
	[
		48,
		98,
		53
	],
	[
		49,
		50,
		22
	],
	[
		49,
		8,
		96
	],
	[
		50,
		51,
		84
	],
	[
		50,
		27,
		16
	],
	[
		51,
		52,
		16
	],
	[
		52,
		53,
		85
	],
	[
		52,
		95,
		96
	],
	[
		53,
		54,
		68
	],
	[
		54,
		55,
		93
	],
	[
		54,
		86,
		35
	],
	[
		54,
		59,
		75
	],
	[
		54,
		40,
		52
	],
	[
		54,
		17,
		45
	],
	[
		55,
		56,
		37
	],
	[
		56,
		57,
		26
	],
	[
		56,
		30,
		76
	],
	[
		57,
		58,
		29
	],
	[
		58,
		59,
		38
	],
	[
		58,
		73,
		37
	],
	[
		58,
		17,
		60
	],
	[
		58,
		47,
		68
	],
	[
		59,
		60,
		10
	],
	[
		60,
		61,
		32
	],
	[
		60,
		52,
		34
	],
	[
		60,
		27,
		86
	],
	[
		61,
		62,
		67
	],
	[
		61,
		65,
		73
	],
	[
		62,
		63,
		66
	],
	[
		62,
		94,
		96
	],
	[
		62,
		38,
		56
	],
	[
		62,
		7,
		55
	],
	[
		63,
		64,
		52
	],
	[
		64,
		65,
		19
	],
	[
		64,
		51,
		89
	],
	[
		65,
		66,
		39
	],
	[
		65,
		94,
		61
	],
	[
		66,
		67,
		12
	],
	[
		67,
		68,
		86
	],
	[
		68,
		69,
		72
	],
	[
		68,
		4,
		28
	],
	[
		69,
		70,
		73
	],
	[
		70,
		71,
		65
	],
	[
		70,
		30,
		74
	],
	[
		71,
		72,
		2
	],
	[
		72,
		73,
		8
	],
	[
		73,
		74,
		96
	],
	[
		73,
		33,
		88
	],
	[
		73,
		4,
		41
	],
	[
		74,
		75,
		43
	],
	[
		74,
		53,
		50
	],
	[
		75,
		76,
		39
	],
	[
		75,
		22,
		48
	],
	[
		76,
		77,
		61
	],
	[
		77,
		78,
		90
	],
	[
		78,
		79,
		8
	],
	[
		79,
		80,
		58
	],
	[
		79,
		3,
		57
	],
	[
		80,
		81,
		91
	],
	[
		80,
		5,
		90
	],
	[
		80,
		91,
		84
	],
	[
		81,
		82,
		58
	],
	[
		81,
		95,
		54
	],
	[
		81,
		30,
		99
	],
	[
		82,
		83,
		13
	],
	[
		83,
		84,
		79
	],
	[
		84,
		85,
		59
	],
	[
		85,
		86,
		28
	],
	[
		85,
		69,
		51
	],
	[
		85,
		13,
		22
	],
	[
		86,
		87,
		46
	],
	[
		87,
		88,
		24
	],
	[
		87,
		91,
		17
	],
	[
		88,
		89,
		63
	],
	[
		88,
		33,
		8
	],
	[
		89,
		90,
		81
	],
	[
		90,
		91,
		14
	],
	[
		90,
		95,
		96
	],
	[
		91,
		92,
		52
	],
	[
		91,
		76,
		51
	],
	[
		91,
		75,
		33
	],
	[
		91,
		78,
		32
	],
	[
		92,
		93,
		64
	],
	[
		93,
		94,
		75
	],
	[
		94,
		95,
		71
	],
	[
		94,
		90,
		63
	],
	[
		95,
		96,
		51
	],
	[
		95,
		30,
		96
	],
	[
		95,
		1,
		31
	],
	[
		95,
		55,
		47
	],
	[
		96,
		97,
		75
	],
	[
		96,
		5,
		87
	],
	[
		97,
		98,
		57
	],
	[
		97,
		66,
		81
	],
	[
		98,
		99,
		31
	],
	[
		99,
		100,
		49
	],
	[
		99,
		32,
		35
	],
	[
		99,
		3,
		49
	],
	[
		100,
		1,
		88
	]
]

let tree = findMST(100, graph);
// Calcula o caminho total
let total = 0;
tree.forEach(r => total += r[2]);

// Printagem dos resultados
for(let arr of tree) {
  console.log("("+arr[0]+") -> ("+arr[1]+") ---- custo: " + arr[2]);
}
console.log("Caminho total: ", total);