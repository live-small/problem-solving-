let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();
const [N, M] = input.split(" ").map(Number);

/* 
1. 아이디어 
- 백트래킹 재귀함수 안에서, for 돌면서 숫자 선택(이때 방문여부 확인)
- (재귀함수 종료조건)재귀함수에서 M개 선택한 경우, log 찍고 끝내기

2. 자료구조 
- 방문 배열(boolean)
- 결과값 저장하는 배열 
*/

// 백트래킹: 재귀함수를 잘 다루는 게 중요함
const solution = (n, m) => {
	const visited = Array(N + 1).fill(0);
	const answer = Array(M).fill(0);

	const recur = (len) => {
		if (len === m) {
			console.log(answer.join(" "));
			return;
		}

		for (let i = 1; i <= n; i++) {
			if (!visited[i]) {
				visited[i] = 1; // 방문체크
				answer[len] = i;
				recur(len + 1);

				// 원상태로 돌려주기 (i 넣기 전 상태로)
				visited[i] = 0;
			}
		}
	};

	recur(0);
};

solution(N, M);
