// 1. 문제 접근방법 
// 비교해야할 원소들(skill_trees)을 1개의 원소로 나눠, 체크함수(맞다면 1, 아니라면 0을 반환)로 답을 구한다.

// 2. 체크함수
// 순서가 맞지 않는 케이스를 정의해, 중간에 0을 리턴시킨다. 
// *순서가 맞지 않는 케이스 
// (1) 이전 스킬이 없는데, 다음 스킬이 존재할 때
// (2) 이전 스킬보다 다음 스킬을 먼저 배울 때 

function check(tree, skill) {
    let prev = tree.indexOf(skill[0]); // 시작점
    for(let i = 1; i < skill.length; i++) {
        let cur = tree.indexOf(skill[i]);  
	        if(prev === -1 && cur > -1) { return 0; } // (1) 
	        else if(prev > cur && cur !== -1) { return 0; } // (2) 
        prev = cur;
    }
    return 1; 
}


function solution(skill, skill_trees) {
    let answer = 0;
    for(let tree of skill_trees) {
        answer += check(tree, skill); 
    }
    return answer;
}
