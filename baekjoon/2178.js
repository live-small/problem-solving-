let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");
const [N, M] = input.shift().split(" ");
const board = [...input].map((r) => r.split("").map(Number));

/*
-조건
1,1 -> N,M : 최소 이동 칸의 수 

-아이디어 
bfs
queue에 1,1의 값 넣고 시작 > 4방향 체크 > 1일 때, 현재값에서 + 1해주기 
다하고 나서, n,m 리턴 

* 유사문제 : 게임맵 최단거리(프로그래머스 LV2)
*/

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

const queue = [[0, 0]];

while (queue.length) {
	const [y, x] = queue.shift();

	for (let i = 0; i < 4; i++) {
		const ny = y + dy[i];
		const nx = x + dx[i];

		// 격자 안인지 체크
		if (ny < N && ny >= 0 && nx < M && nx >= 0) {
			if (board[ny][nx] === 1) {
				// 첫 방문 && 이동가능 칸
				board[ny][nx] = board[y][x] + 1;
				queue.push([ny, nx]);
			}
		}
	}
}
console.log(board[N - 1][M - 1]);
