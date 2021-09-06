/*
1. 문제 링크: https://programmers.co.kr/learn/courses/30/lessons/64065
2. 접근방법
문제: 튜플의 표현 집합으로 어떤 튜플인지 파악하는 문제 
- 튜플의 순서는 집합 원소를 길이로 정렬했을 때, 추가되는 원소의 순서와 동일함을 찾음 
  -> 이차원 배열로 포함관계를 filter하기로 생각. 
  -> 문자열을 이차원 배열로 가공 
    (문자열의 {} => []로 치환 후, JSON.parse로 array로 바꿔줌)

3. 느낀점 
문자열 -> 이차원배열 가공 과정에서 막혔었는데, 
서버에서 값을 받아올 때 string이고, 이를 js에서 이용하기 위해 parse한다는 과정을 떠올려, 구현 아이디어를 얻었다. 
*서버에서 값을 받아올 때, string 이란 점 
*값을 받아와 꼭 가공해야된다는 점
*/

function solution(s) {
    let answer = [];
    // 문자열 가공 
    const tuple = JSON.parse(s.replace(/\{/g, '[').replace(/\}/g, ']'));

    // 순서 찾아 push 
    tuple.sort((a, b) => a.length > b.length ? 1 : -1);
    tuple.reduce((res, cur) => {
        if (res) {
            const diff = cur.filter((elem) => !res.includes(elem));
            answer.push(...diff);
        }
        return cur;
    }, [])

    return answer;
}