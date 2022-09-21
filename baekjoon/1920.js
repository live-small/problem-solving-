// 입력값 가공
let fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");
let numArr = input[1].split(" ").map(Number);
const targetArr = input[3].split(" ").map(Number);

/*
아이디어
- numArr 정렬 
- targetArr 돌면서, search -> 있으면 1 : 0 출력 

자료구조
- 이진탐색 search로직 
- set이용 
*/

// 1. set 이용 -> ok
numArr = new Set(numArr);
const answer = targetArr.map((v) => (numArr.has(v) ? 1 : 0)).join("\n");
console.log(answer);

// 2. 이진탐색 -> 시간초과(백준 페이지 내) -> 굳이 인덱스가 필요한 건 아니니까, 이진탐색으로 안푸는게 나을듯
const solution = (N, numArr, M, targetArr) => {
	numArr = [...new Set(numArr)].sort((a, b) => a - b);

	const search = (st, en, target) => {
		if (st === en) {
			if (numArr[st] === target) {
				console.log(1);
			} else {
				console.log(0);
			}
			return;
		}

		let mid = Math.floor((st + en) / 2);
		if (numArr[mid] < target) {
			search(mid + 1, en, target);
		} else {
			search(st, mid, target);
		}
	};

	for (let t of targetArr) {
		search(0, N - 1, t);
	}
};

solution(N, numArr, M, targetArr);
