function solution(number, k) {
	const answerLength = number.length - k;
	const temp = [];

	for (const num of number) {
		while (k > 0 && temp.length > 0 && temp[temp.length - 1] < num) {
			k--;
			temp.pop();
		}
		temp.push(num);
	}

	const answer = temp.join("").slice(0, answerLength);
	return answer;
}

/*
-조건
number에서 k개 제거
만들 수 있는 큰수, 문자열로 리턴 
k, number 백만**

-아이디어
number돌면서 k 제거 
: 임시배열에 마지막값 체크하면서 넣기  
1) k > 0 && 임시배열 마지막값이 있을 때: 해당 숫자가 크면, 얘보다 작은 거 빼기
2) 없으면: 그냥 넣기 

마지막에, 자릿수만큼 자르기 - 99999처럼 동일한 숫자반복인 경우, k가 그대로있기에 자리수 맞춰서 잘라야함
*/
