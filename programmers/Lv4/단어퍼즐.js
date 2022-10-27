function solution(strs, t) {
	const dp = Array(+t.length + 1).fill(0);

	// dp table 돌리기
	for (let i = 1; i <= t.length; i++) {
		// 각 자리 수 크기의 "문자" 만들 수 있는 최소값 구하기
		dp[i] = Infinity;

		for (let j = 1; j <= Math.min(i, 5); j++) {
			// 단어조각은 1이상 5이하 -> 5까지만 탐색하면 됨
			const start = i - j;
			const end = i;

			if (strs.includes(t.slice(start, end))) {
				dp[i] = Math.min(dp[i], dp[i - j] + 1);
			}
		}
	}

	return dp[t.length] === Infinity ? -1 : dp[t.length];
}
