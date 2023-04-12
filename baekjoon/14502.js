/*
- 리턴값: 안전영역 최대크기
* 안전영역: 0의 개수 


- 구현흐름
바이러스 좌표, 빈칸(0) 좌표 저장 [바이러스 전파할 때 사용 | 빈칸은 벽 둘 때 사용]
빈칸 좌표 돌면서, 벽 3개 두기 => 이걸 어떻게 하지?? 3중 for문??
바이러스 전파 (bfs)
안전영역 크기 구하기 (0개수) -> 최대값일 때 반영 
*/
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...temp] = fs.readFileSync(filePath).toString().trim().split('\n');
const [h, w] = N.split(' ').map(Number);
const map = temp.map((row) => row.split(' ').map(Number));

const solve = () => {
  // 바이러스 좌표, 빈칸 좌표 저장
  const virus = [];
  const empty = [];

  map.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val === 2) virus.push([y, x]);
      if (val === 0) empty.push([y, x]);
    });
  });

  const safeZoneSize = empty.length - 3;
  let answer = -1;

  for (let i = 0; i < empty.length; i++) {
    const [y, x] = empty[i]; // 첫번째 벽 선택
    map[y][x] = 1;

    for (let j = i + 1; j < empty.length; j++) {
      const [y2, x2] = empty[j]; // 두번째 벽 선택
      map[y2][x2] = 1;

      for (let k = j + 1; k < empty.length; k++) {
        const [y3, x3] = empty[k];
        map[y3][x3] = 1;
        // 벽 3개 선택한 상태
        // 바이러스 전파(bfs)
        const count = bfsVirus(virus, safeZoneSize);
        answer = Math.max(answer, count);
        map[y3][x3] = 0;
      }
      map[y2][x2] = 0;
    }
    map[y][x] = 0;
  }

  console.log(answer);
};

solve();

function bfsVirus(virusArr, safeZoneSize) {
  // bfs 진행 (바이러스 인접노드에 전파) - 전파할 때, 개수세기 -> safeZoneSize - 전파된 노드수 리턴
  // virusArr에서 bfs 시작함
  const visited = Array.from({ length: h }, () => Array(w).fill(0));
  let virusCount = 0;

  const bfs = (y, x) => {
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    // 시작점 세팅
    visited[y][x] = 1;
    const queue = [[y, x]];

    while (queue.length) {
      const [i, j] = queue.pop();

      for (let z = 0; z < 4; z++) {
        const [ny, nx] = [i + dy[z], j + dx[z]];
        if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
          // map 안의 좌표만 가능 && 0일 때 전파 가능
          if (map[ny][nx] === 0 && !visited[ny][nx]) {
            virusCount++;
            visited[ny][nx] = 1;
            queue.push([ny, nx]);
          }
        }
      }
    }
  };

  // 수행
  virusArr.forEach((pos) => {
    bfs(...pos);
  });

  return safeZoneSize - virusCount;
}
