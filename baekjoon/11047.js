/*
1. 아이디어
- 동전 가치 종류를 거꾸로 돌면서, K로 나누기 -> 몫 더하기, 잔돈 계산 
- 잔돈 0이면 break; 

2. 시간복잡도
O(10) -> O(1)

3. 자료구조
- 잔돈개수 변수 
*/

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");
let [N, total] = input[0].split(" ");
const coinUnit = input.slice(1).map(Number);
let count = 0;

for (let i = N - 1; i >= 0; i--) {
	if (total === 0) break;

	const useCoin = Math.floor(total / coinUnit[i]);
	if (useCoin) {
		count += useCoin;
		total = total % coinUnit[i];
	}
}

console.log(count);
