/*
- 조건
2팀으로 나누는데, 능력치 차이 최소화 **
리턴값: 능력치 차이 최솟값

- 아이디어: 백트래킹
재귀로 팀 나누고,
반반씩 나눴을 때, 능력치 값 계산
 - 문제는 ! pick한 팀원은 아는데, 남은 팀원은 어떻게? <- 방문배열, 방문여부로 나누기
 - 능력치 값 계산
	- 1,2,3 -> 12, 21 | 13, 31 | 23, 32
	- 능력치 구할 멤버를 뽑는 로직을 어떻게 하지? ** -> 이중포문으로 돌면서, 같은 팀이면 점수추가

- 시간초과..why? -> 54번째 줄, start + 1 -> i + 1로 수정 
*/

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input.shift());
const score = input.map((row) => row.split(' ').map(Number));

const Solution = (totalPerson, score) => {
  let answer = Number.MAX_SAFE_INTEGER;
  const pick = Array.from({ length: totalPerson }, () => 0);

  const makeRandomTeam = (numberOfTeam, start) => {
    // 종료
    // - 0일 경우, 더이상 계산할 필요 없음
    if (answer === 0) return;
    // - 팀 능력치 계산
    if (numberOfTeam === Math.floor(totalPerson / 2)) {
      let team1Score = 0;
      let team2Score = 0;

      for (let j = 0; j < totalPerson; j++) {
        for (let k = 0; k < totalPerson; k++) {
          if (pick[j] && pick[k]) {
            team1Score += score[j][k];
          }
          if (!pick[j] && !pick[k]) {
            team2Score += score[j][k];
          }
        }
      }

      answer = Math.min(answer, Math.abs(team1Score - team2Score));
      return;
    }

    // 수행 - (pick 여부에 따라)팀원 고르기
    for (let i = start; i < totalPerson; i++) {
      pick[i] = 1;
      makeRandomTeam(numberOfTeam + 1, i + 1);
      pick[i] = 0;
    }
  };

  makeRandomTeam(0, 0);

  console.log(answer);
};

Solution(N, score);
