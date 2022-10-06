/*
-아이디어
empty, virus 좌표 구하기 
empty를 돌면서 3개까지만 벽 세우기 (dfs)
벽이 3개라면, virus 확산(bfs) + 안전영역 개수 구하기 
안전영역이 최대값이라면, 업데이트 

-변수 
empty[]
virus[]
안전영역 변수 
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...map] = fs
	.readFileSync(filePath)
	.toString()
	.split("\n")
	.map((v) => v.split(" ").map(Number));

const [H, W] = N;
const empty = [];
const virus = [];
let answer = 0;

map.forEach((row, y) =>
	row.forEach((elem, x) => {
		if (elem === 0) empty.push([y, x]);
		else if (elem === 2) virus.push([y, x]);
	})
);

const getSafeZone = (map) => {
	// 바이러스 상하좌우 확산 => 안전영역 세기
	let virusCount = 0;
	const queue = JSON.parse(JSON.stringify(virus));
	const copyMap = JSON.parse(JSON.stringify(map));
	const dy = [0, 1, 0, -1];
	const dx = [1, 0, -1, 0];

	while (queue.length) {
		const [y, x] = queue.shift();

		for (let i = 0; i < 4; i++) {
			const [ny, nx] = [y + dy[i], x + dx[i]];

			if (
				ny >= 0 &&
				ny < H &&
				nx >= 0 &&
				nx < W &&
				copyMap[ny][nx] === 0
			) {
				virusCount++;
				copyMap[ny][nx] = 2;
				queue.push([ny, nx]);
			}
		}
	}

	return empty.length - 3 - virusCount;
};

const dfs = (wallCount) => {
	if (wallCount === 3) {
		// 바이러스 확산 -> 안전영역 구하기
		answer = Math.max(answer, getSafeZone(map));
		return;
	}

	empty.forEach(([y, x]) => {
		if (map[y][x] === 0) {
			map[y][x] = 1;
			dfs(wallCount + 1);
			map[y][x] = 0;
		}
	});
};

dfs(0);
console.log(answer);
