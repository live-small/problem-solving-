let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...A] = fs.readFileSync(filePath).toString().split(/\s/).map(Number);

/*
-조건
인접한 원소의 차의 합, 최대값 리턴 => 다 구해봐야함. 재귀! 

-아이디어
1. 만들 수 있는 배열 순서 케이스 (순열)
2. 배열 완성했으면, 인접한 원소 차의 합 구하기 
3. 큰 값을 업데이트 
*/

const isVisited = Array(N).fill(0);
const arr = [];
let maxResult = 0;

const getPermutation = () => {
	if (arr.length === N) {
		// 인접한 차의 합 구하기
		let sum = 0;
		for (let k = 0; k < N - 1; k++) {
			sum += Math.abs(arr[k] - arr[k + 1]);
		}
		maxResult = Math.max(sum, maxResult);
		return;
	}

	for (let i = 0; i < N; i++) {
		if (!isVisited[i]) {
			arr.push(A[i]);
			isVisited[i] = 1;
			getPermutation();

			arr.pop();
			isVisited[i] = 0;
		}
	}
};

getPermutation();
console.log(maxResult);
