function solution(progresses, speeds) {
	const answer = [];
	const needTimes = progresses.map((progress, idx) => {
		return Math.floor((100 - progress) / speeds[idx]);
	});
	let nowDay = needTimes[0]; // 현재 날짜

	while (needTimes.length > 0) {
		let count = 0;

		while (needTimes[0] <= nowDay) {
			// 배포가능한 작업, 배포하기
			needTimes.shift();
			count++;
		}

		answer.push(count);
		nowDay = needTimes[0]; // 배포가능한 날짜로 이동
	}

	return answer;
}

solution([93, 30, 55], [1, 30, 5]);
