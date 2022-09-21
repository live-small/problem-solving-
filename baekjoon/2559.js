// 입력값 가공
let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

/*
1. 아이디어
- 최대 연속 수만큼(K) 더하기 
- K+1부터 for문 돌면서, K+1 더하고, 이전 값 빼고 => 최대값 체크 

2. 자료구조
최대값 담을 변수 

3. 시간복잡도 
O(N * 2) => O(N)
*/

const solution = (N, K, arr) => {
	let temp = arr.slice(0, K).reduce((a, b) => a + b, 0);
	let maxNum = temp;

	for (let i = K; i < N; i++) {
		temp += arr[i];
		temp -= arr[i - K];
		maxNum = Math.max(maxNum, temp);
	}

	console.log(maxNum);
};

solution(N, K, arr);
