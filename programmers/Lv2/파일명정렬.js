/* 
0. 문제 링크
https://programmers.co.kr/learn/courses/30/lessons/17686

1. 문제설명
파일명은 HEAD, NUMBER, TAIL로 구성되어있고, 
HEAD가 동일하면, NUMBER을 기준으로 정렬해야한다. 

2. 구현흐름
HEAD를 파싱해, 동일한 경우에만 NUMBER을 파싱해 정렬 기준으로 삼는다. 
동일하지 않을 경우엔, 파싱한 것을 정렬 기준으로 삼아 정렬을 수행한다. 

3. 추가공부 
정규표현식의 lookahead negative를 공부해, HEAD 파싱에 적용해보았다 
+) lookahead positive를 이용한 코드 추가 
+) git wiki에 정리
https://github.com/live-small/problem-solving-/wiki/%5BRegExr%5D-lookarond-%EA%B3%B5%EB%B6%80
*/ 

function solution(files) {
    let answer = [];
    files.sort((prev, cur) => {
        // HEAD 
        // - lookahead negative 
        let p = prev.match(/^((?!\d).)+/gi).pop().toLowerCase();
        let c = cur.match(/^((?!\d).)+/gi).pop().toLowerCase();    
        
        // - lookahead positive
        // let p = prev.match(/^[a-zA-Z-\s]*(?=\d)/gi).pop().toLowerCase();
        // let c = cur.match(/^[a-zA-Z-\s]*(?=\d)/gi).pop().toLowerCase();
        if(p === c) {
            // NUMBER 
            p = prev.match(/[0-9]{1,5}/).pop();
            c = cur.match(/[0-9]{1,5}/).pop(); 
            p = parseInt(p,10); 
            c = parseInt(c,10); 
            return p - c; 
        }
        return p > c ? 1 : -1; 
    })
    answer = files; 
    return answer;
}
