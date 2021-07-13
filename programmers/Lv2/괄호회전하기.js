// 올바른지 체크 
function check(start, s) {
     let match = {"}" : "{", "]": "[", ")": "("}; // 짝인 값, object key-value로 관리 
     let stack = []; 
     let flag = true; 
    
     for(let j = start; j < start + s.length; j++) {
        let idx = j % s.length; 
        if(s[idx] === '(' || s[idx] === '{' || s[idx] ==='[') { 
            stack.push(s[idx]); } 
        else {
         let top = stack.pop(); 
             if(match[s[idx]] !== top) {
                   flag = false; 
                   return flag; 
                }
           } 
     }
    return stack.length === 0? flag : !flag ; 
} 


function solution(s) {
    let answer = 0;
    let pointer = 0; 

    for(let i in s) {
        if(check(pointer, s)) { 
            answer++; 
        }  
        pointer++; 
    }

    return answer;
}
