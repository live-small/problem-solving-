/* 
1. 문제링크: https://programmers.co.kr/learn/courses/30/lessons/42578 

2. 문제설명
스파이가 가진 옷들을 인자로 받아, 서로 다른 옷의 조합 수를 리턴해야한다. 
**중요조건: 스파이는 최소 1개의 옷을 입는다

3. 조합 계산 
1) 종류별 개수 + 1 → 안 입는 케이스를 더한다. 
  (동시에 일어나기에, 종류별 케이스를 곱해 조합을 구한다)
2) 이후, 모두 안입는 경우를 빼준다. 
*/

function solution(clothes) {
    let answer = 0;
    let memory = {};

    // 종류로 옷 분류
    for (let [name, kind] of clothes) {
        memory[kind] ? memory[kind]++ : memory[kind] = 1;
    }

    // 조합 계산
    let temp = 1;
    for (let type in memory) {
        temp *= (memory[type] + 1) // 1) 
    }
    answer = temp - 1; // 2) 
    return answer;
}
