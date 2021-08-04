// 문제 링크: https://programmers.co.kr/learn/courses/30/lessons/12980

function solution(n)
{
    let ans = 0; 
    while(n !== 1) {
        if(n % 2) { // 홀수일때: 점프 1회 필수 
            ans++; 
            n = (n-1)/2;
        } else { n = n/2; } // 짝수일때: 순간이동
    }
    return ans+1; // 1까지 오는데 점프 1회 필수 
}
