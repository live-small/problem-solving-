/*
-조건
양방향그래프, 1~N 까지 최단거리 
주어진 두 정점 꼭 방문해야함 
정점에 1번 이상 방문가능

리턴값: 최단 경로 길이 : -1 

-아이디어
시작점 -> 인접노드 최단거리 array 함수만들어서 이용 

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
	.readFileSync(filePath)
	.toString()
	.trim()
	.split("\n")
	.map((v) => v.split(" ").map((v) => +v));
const [N, _] = input.shift();
const [X, Y] = input.pop();
const S = 1; // 시작점

const adj = Array.from({ length: N + 1 }, () => []);

for (const [n1, n2, cost] of input) {
	adj[n1].push([n2, cost]);
	adj[n2].push([n1, cost]);
}

// 특정 노드에서 최단경로 구하기
const getShortestDistance = (startNode) => {
	const distance = Array(N + 1).fill(Infinity);
	distance[startNode] = 0;
	const queue = [];
	queue.push(startNode);

	while (queue.length) {
		const currentNode = queue.shift();

		adj[currentNode].forEach(([node, cost]) => {
			if (distance[node] > distance[currentNode] + cost) {
				distance[node] = distance[currentNode] + cost;
				queue.push(node);
			}
		});
	}
	return distance;
};

const route1 = getShortestDistance(1);
const routeX = getShortestDistance(X);
const routeY = getShortestDistance(Y);

const planA = route1[X] + routeX[Y] + routeY[N];
const planB = route1[Y] + routeY[X] + routeX[N];

planA === Infinity || planB === Infinity
	? console.log(-1)
	: console.log(planA < planB ? planA : planB);
