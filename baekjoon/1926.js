let fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\n");
const [n, m] = input.shift().split(" ");
const board = [...input].map((row) => row.split(" "));

/* 아이디어
- 2중 for문 돌면서, 1인 경우 && 미방문 -> bfs 
- bfs : 그림 개수 + 1, 최대값 갱신 
*/

function solution(n, m, board) {
	// n: 세로 | m: 가로
	const visited = Array(+n)
		.fill()
		.map(() => Array(+m).fill(0));
	// * Array(length : only Number)

	let maxVal = 0;
	let totalVal = 0;

	const dy = [0, 1, 0, -1];
	const dx = [1, 0, -1, 0];

	const bfs = (y, x) => {
		let size = 1;
		const queue = [[y, x]];
		while (queue.length > 0) {
			const [ey, ex] = queue.pop();
			for (let i = 0; i < 4; i++) {
				let ny = ey + dy[i];
				let nx = ex + dx[i];

				if (ny >= 0 && ny < n && nx >= 0 && nx < m) {
					if (board[ny][nx] == 1 && !visited[ny][nx]) {
						size += 1;
						visited[ny][nx] = 1;
						queue.push([ny, nx]);
					}
				}
			}
		}

		return size;
	};

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			if (board[i][j] == 1 && !visited[i][j]) {
				// bfs 실행
				totalVal += 1;
				visited[i][j] = 1; // 방문
				maxVal = Math.max(maxVal, bfs(i, j));
			}
		}
	}

	console.log(totalVal);
	console.log(maxVal);
}

solution(n, m, board);
