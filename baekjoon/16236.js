const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const board = input.map((i) => i.split(' ').map(Number));

const solve = () => {
  let level = 2;
  let answer = 0;
  let sharkPos = [];
  const dy = [0, 1, 0, -1];
  const dx = [1, 0, -1, 0];
  const eats = Array(7).fill(0);

  // 아기상어 좌표 찾기
  board.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val === 9) {
        sharkPos.push(y, x);
        board[y][x] = 0; // 상어위치에도 이동할 수 있게 0으로 처리
      }
    });
  });

  // 흐름: 상어위치에서 물고기 정보 탐색 -> 우선순위 높은 거 찾아먹음 -> 위치변경 -> 다시 반복(방문배열 리셋)
  while (true) {
    // * 끝내는 제어권이 로직 안에 있을 때 true로
    const queue = []; // 이동할 노드 기록
    const fishPos = [];
    const visited = Array.from({ length: N }, () => Array(N).fill(false));

    // 시작점 세팅 - y, x, dist
    queue.push([...sharkPos, 0]);
    visited[sharkPos[0]][sharkPos[1]] = true;

    // [상어위치에서 물고기 정보 탐색]
    while (queue.length) {
      const [y, x, dist] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        // 맵 안에 있어야함, 첫방문이어야함
        // 이동할 수 있을 때, queue에 넣기 -> 아기상어 현재 레벨보다 작거나 같아야함
        if (ny >= 0 && ny < N && nx >= 0 && nx < N && !visited[ny][nx] && board[ny][nx] <= level) {
          queue.push([ny, nx, dist + 1]);
          visited[ny][nx] = true;
          // 먹을 수 있는 물고기라면, 넣어두기
          if (board[ny][nx] !== 0 && board[ny][nx] < level) {
            fishPos.push([ny, nx, dist + 1]);
          }
        }
      }
    }

    // [물고기 먹기]
    if (fishPos.length > 0) {
      // - 먹는 조건에 따라 정렬
      fishPos.sort((a, b) => {
        const [y, x, dist] = a;
        const [y1, x1, dist1] = b;

        if (dist !== dist1) {
          return dist - dist1;
        } else {
          if (y !== y1) {
            return y - y1;
          } else {
            return x - x1;
          }
        }
      });

      const [fy, fx, fdist] = fishPos[0];
      board[fy][fx] = 0;

      // 먹은 거 기록 - 레벨, 물고기 수
      eats[level] += 1;
      if (eats[level] === level) {
        level += 1;
      }
      sharkPos = [fy, fx];
      answer += fdist;
    } else {
      console.log(answer);
      return;
    }
  }
};

solve();
