let fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, Target, ...arr] = fs.readFileSync(filePath).toString().trim().split(/\s/).map(Number);

/*
-조건
3장의 합이 goal과 동일/근접한 값 리턴 

-아이디어
완전탐색? 최대 100장 중 3장 뽑는 케이스 -> 근접한 값 넣기, 일치값있으면 바로 리턴 
*/

const Solution = (N, Target, arr) => {
  const visited = Array.from({ length: N }, () => 0);
  let answer = 0;

  const recur = (depth, total) => {
    if (depth === 3) {
      if (total <= Target) {
        answer = Math.max(answer, total);
      }
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!visited[i]) {
        visited[i] = 1;
        recur(depth + 1, total + arr[i]);
        visited[i] = 0;
      }
    }
  };

  recur(0, 0);

  console.log(answer);
};

Solution(N, Target, arr);
