let fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const [N, M] = input.shift().split(' ');
const board = [...input].map((r) => r.split('').map(Number));

/*
-조건
1,1 -> N,M : 최소 이동 칸의 수 

-아이디어 
bfs
queue에 1,1의 값 넣고 시작 > 4방향 체크 > 1일 때, 현재값에서 + 1해주기 
다하고 나서, n,m 리턴 

* 유사문제 : 게임맵 최단거리(프로그래머스 LV2)
*/

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

const queue = [[0, 0]];

// bfs - 인접노드따라 탐색
while (queue.length) {
  const [y, x] = queue.shift();

  if (y === N - 1 && x === M - 1) {
    console.log(board[y][x]);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    // 격자 안인지 체크
    if (ny < N && ny >= 0 && nx < M && nx >= 0) {
      if (board[ny][nx] === 1) {
        // 첫 방문 && 이동가능 칸 -> 이렇게해도 괜찮은게, 가장 빨리가는 루트가 목적지에 방문처리할거임
        board[ny][nx] = board[y][x] + 1;
        queue.push([ny, nx]);
      }
    }
  }
}

// 프로그래머스 - 게임맵 최단거리 풀이
{
  const DIRECTION = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  // BFS
  function solution(maps) {
    const r = maps.length - 1;
    const c = maps[0].length - 1;
    const queue = [[0, 0]];

    while (queue.length) {
      const [y, x] = queue.shift();
      if (y === r && x === c) return maps[y][x];

      for (let k = 0; k < 4; k++) {
        const [dy, dx] = DIRECTION[k];
        const ny = y + dy;
        const nx = x + dx;

        if (ny >= 0 && ny <= r && nx >= 0 && nx <= c && maps[ny][nx] === 1) {
          maps[ny][nx] = maps[y][x] + 1;
          queue.push([ny, nx]);
        }
      }
    }
    return -1;
  }
}
