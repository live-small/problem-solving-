/* 2022-07-30 풀이 
1) 문자열 길이만큼 돌면서,회전시킴 -> 회전 어떻게 시킬지 
2) 올바른 문자열인지 체크 -> 올바른 문자열 체크 어떻게 할지 : 스택이용 
3) 흐름: 문자열 길이만큼 돌면서, 해당 문자열이 올바른지 체크 -> 회전시킨 문자열로 업데이트 
*/
function solution(s) {
	let answer = 0;
	let target = [...s];

	for (const i of [...s]) {
		if (checkRight(target)) {
			answer++;
		}
		target = [...target.slice(1), target[0]];
	}

	return answer;
}

const checkRight = (arr) => {
	const pair = { "}": "{", "]": "[", ")": "(" };
	const stack = [];
	for (const elem of arr) {
		if (!pair[elem]) stack.push(elem);
		else if (pair[elem] !== stack.pop()) {
			return false;
		}
	}
	return stack.length === 0 ? true : false;
};

/* 
#풀이설명
1) 주어진 길이만큼 이동: 모듈러 연산을 통해 시작 위치조절

2) 올바른지 체크: 
 - 열린괄호: 스택에 넣기 
 - 닫힌괄호: 스택이 비지 않았을 때, 팝한 값과 일치하면 올바른 괄호이니 다음값으로 넘어감  
             일치하지 않으면, 올바르지 않으니 false 반환 
 - 닫힌괄호인데, 스택이 비어있으면 false 

3) 주의할 케이스 
   열린괄호만 있는 케이스: 무사히 끝나 true 반환함. 
   올바른 괄호일 경우, stack이 비어있어야함. 그럴경우만 true반환 
*/

// 2) 올바른지 체크
function check(start, s) {
	let match = { "}": "{", "]": "[", ")": "(" }; // 짝인 값, object key-value로 관리
	let stack = [];
	let flag = true;

	for (let j = start; j < start + s.length; j++) {
		let idx = j % s.length;
		if (s[idx] === "(" || s[idx] === "{" || s[idx] === "[") {
			stack.push(s[idx]);
		} else {
			let top = stack.pop();
			if (match[s[idx]] !== top) {
				flag = false;
				return flag;
			}
		}
	}
	return stack.length === 0 ? flag : !flag; // 3) 주의할 케이스: 열린괄호만 있는 경우**
}

function solution(s) {
	let answer = 0;
	let pointer = 0;

	for (let i in s) {
		if (check(pointer, s)) {
			// 1) 시작 위치 조절
			answer++;
		}
		pointer++;
	}

	return answer;
}
