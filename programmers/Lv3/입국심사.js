function solution(n, times) {
	const sortedTimes = times.sort((a, b) => a - b);
	let start = 1;
	let end = n * sortedTimes[sortedTimes.length - 1];

	while (start <= end) {
		const midTime = Math.floor((start + end) / 2);
		const passedPeople = sortedTimes.reduce(
			(acc, time) => acc + Math.floor(midTime / time),
			0
		);

		if (passedPeople >= n) {
			end = midTime - 1;
		} else {
			start = midTime + 1;
		}
	}

	return start;
}
