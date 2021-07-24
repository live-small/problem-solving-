/*
1. 문제 접근방법 
중량을 기준으로 오름차순 정렬 후, 투포인터로 탐색범위를 좁혀 답을도출한다.  


2. 발생케이스  
1) 최소중량 + 최대중량 <= 제한중량 
   : 구명보트에 2명을 태워 보낼 수 있기에 둘을 태워 보낸다. 
    이후, 최소값 인덱스를 조절해야한다**  
    
2) 최소중량 + 최대중량 > 제한중량 
   : 2명이 탈 수없기에, 최대중량(1명)만 태워 보낸다. 
*/



function solution(people, limit) {
    let answer = 0;
    let startIdx = 0; 
    let endIdx = people.length-1; 

    people.sort((a,b) => a-b);
    for(let i = endIdx; i >= startIdx; i--) {
        if(people[startIdx] + people[i] <= limit) {
            startIdx++; // 2-1) 
        }
        answer += 1; 
    }
    return answer;
}
