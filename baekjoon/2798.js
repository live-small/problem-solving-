let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, goal, ...card] = fs
	.readFileSync(filePath)
	.toString()
	.split(/\s/)
	.map(Number);

/*
-조건
3장의 합이 goal과 동일/근접한 값 리턴 

-아이디어
완전탐색? 최대 100장 중 3장 뽑는 케이스 -> 근접한 값 넣기, 일치값있으면 바로 리턴 
*/

let answer = 0;
const arr = [];
const isVisited = Array(N).fill(0);

const recur = (len) => {
	// 종료
	if (len === 3) {
		const total = arr.reduce((a, b) => a + b, 0);
		if (total <= goal) {
			answer = Math.max(answer, total);
		}
		return;
	}

	// 실행
	for (let i = 0; i < N; i++) {
		if (!isVisited[i]) {
			isVisited[i] = 1;
			arr.push(card[i]);
			recur(len + 1);

			arr.pop();
			isVisited[i] = 0;
		}
	}
};

recur(0);

console.log(answer);
