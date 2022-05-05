// 처음
// 데이터형태 - {신고당한사람 : [신고한 사람들..]}로 report를 가공해
// 신고한 사람이 k보다 클 경우, 신고한 사람 + 1로 구현했음
function solution1(id_list, report, k) {
	const list = {};
	const good = {};
	const processedReport = [...new Set(report)].map((r) => r.split(" "));

	for (let [sender, receiver] of processedReport) {
		list[receiver] = [...(list[receiver] || []), sender];
	}

	for (let i in list) {
		if (list[i].length >= k) {
			list[i].map((user) => (good[user] = (good[user] || 0) + 1));
		}
	}

	const answer = id_list.map((id) => good[id] || 0);

	return answer;
}

// 수정 - 프로그래머스 다른사람풀이 참고해 수정한 코드
// 신고당한 사람의 총신고횟수를 구해놓고(receiver)
// receiver을 참고해 신고한 사람이 받을 신고결과 이메일 개수(receiver >= k)를 정함
function solution2(id_list, report, k) {
	const sender = {};
	const receiver = {};
	const reports = [...new Set(report)].map((r) => r.split(" "));

	for (let [s, r] of reports) {
		receiver[r] = (receiver[r] || 0) + 1;
	}

	for (let [s, r] of reports) {
		if (receiver[r] >= k) {
			sender[s] = (sender[s] || 0) + 1;
		}
	}

	const answer = id_list.map((id) => sender[id] || 0);

	return answer;
}
