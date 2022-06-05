function solution(progresses, speeds) {
	const answer = [];
	const finishDays = progresses.map((progress, idx) => {
		return Math.floor((100 - progress) / speeds[idx]);
	});
	let nowDay = finishDays[0]; // 현재 날짜

	while (finishDays.length > 0) {
		let count = 0;

		while (finishDays[0] <= nowDay) {
			// 배포가능한 작업, 배포하기
			finishDays.shift();
			count++;
		}
		answer.push(count);
		nowDay = finishDays[0]; // 배포가능한 날짜로 이동
	}

	return answer;
}

solution([93, 30, 55], [1, 30, 5]);
