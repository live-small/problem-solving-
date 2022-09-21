let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

/*
아이디어 
- 이전 값을 재사용함 -> 점화식: An = An-1 + An-2 -> DP 
- 1,2 결과값 배열에 넣고, 3부터 N까지 값 구하기 
- N 결과값 출력
*/
const N = Number(input);
const answer = [0, 1, 2];
for (let i = 3; i < N + 1; i++) {
	answer.push((answer[i - 1] + answer[i - 2]) % 10007);
}

console.log(answer[N]);
