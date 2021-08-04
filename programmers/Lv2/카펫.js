/* 
1. 구현흐름 
인자를 활용해 카펫 전체 격자 개수를 구한 뒤, 
가능한 가로,세로 사이즈 케이스를 구한다(약수로 구현)
외곽의 격자 수로 주어진 brown과 동일하면, 정 답 ! 

2. 주의 
가장 외곽의 격자 수(brown)를 구할 때, 겹치는 부분을 빼줘야한다
*/

function solution(brown, yellow) {
    let answer = [];
    let blockNum = brown + yellow; 
   
    for(let i = 2; i <= Math.sqrt(blockNum); i++) {
        if(blockNum % i == 0) {
            const temp = blockNum / i;
            if(2*(temp+i)-4 === brown) {
                answer.push(temp, i); 
                break; 
            }
        } 
    }
    return answer;
}
