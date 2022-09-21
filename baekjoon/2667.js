let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");
const N = input.shift();
const board = [...input].map((row) => [...row]);

// * DFS
const solutionDFS = (N, board) => {
	const visited = Array(+N)
		.fill()
		.map(() => Array(+N).fill(0));
	const list = [];
	const dy = [0, 1, 0, -1];
	const dx = [1, 0, -1, 0];
	let count = 0;

	const dfs = (y, x) => {
		count += 1;

		for (let k = 0; k < 4; k++) {
			ny = y + dy[k];
			nx = x + dx[k];

			if (ny >= 0 && ny < N && nx >= 0 && nx < N) {
				if (board[ny][nx] == 1 && !visited[ny][nx]) {
					visited[ny][nx] = 1;
					dfs(ny, nx);
				}
			}
		}
	};

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			if (board[i][j] == 1 && !visited[i][j]) {
				visited[i][j] = 1;
				count = 0;
				dfs(i, j);
				list.push(count);
			}
		}
	}

	// 답 출력
	list.sort((a, b) => a - b); // 오름차순
	console.log(list.length);
	for (const v of list) {
		console.log(v);
	}
};

solutionDFS(N, board);

// * BFS
const solutionBFS = (N, board) => {
	const visited = Array(+N)
		.fill()
		.map(() => Array(+N).fill(0));
	const list = [];
	const dy = [0, 1, 0, -1];
	const dx = [1, 0, -1, 0];

	const bfs = (y, x) => {
		const queue = [[y, x]];
		let count = 1;
		// - 4가지 방향에 1이 있으면 탐색하기

		while (queue.length) {
			const [ey, ex] = queue.shift();
			for (let k = 0; k < 4; k++) {
				const ny = ey + dy[k];
				const nx = ex + dx[k];

				if (ny >= 0 && ny < N && nx >= 0 && nx < N) {
					if (board[ny][nx] == 1 && !visited[ny][nx]) {
						visited[ny][nx] = 1;
						count += 1;
						queue.push([ny, nx]);
					}
				}
			}
		}

		return count;
	};

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			if (board[i][j] == 1 && !visited[i][j]) {
				// - 방문체크
				// - 연결된 친구들 카운팅
				visited[i][j] = 1;
				list.push(bfs(i, j));
			}
		}
	}

	list.sort((a, b) => a - b);
	console.log(list.length);
	for (const i of list) {
		console.log(i);
	}
};

solutionBFS(N, board);
