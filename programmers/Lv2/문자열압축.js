function solution(s) {
	let answer = s.length;
	const start = 1;
	const end = Math.floor(s.length / 2);

	// 자를 수 있는만큼 돌면서 체크
	for (let parsingNum = start; parsingNum <= end; parsingNum++) {
		let temp = "";
		const count = {};

		// parsingNum으로 자르고, 비교하고, 어디까지 압축 가능한지 체크**
		const arrayToParse = parsingString(parsingNum, s);
		arrayToParse.forEach((val, index, arr) => {
			const next = arr[index + 1];
			if (val === next) {
				count[val] ? count[val]++ : (count[val] = 2);
			} else if (count[val]) {
				temp += `${count[val]}${val}`;
				delete count[val];
			} else {
				temp += val;
			}
		});

		if (answer > temp.length) {
			answer = temp.length;
		}
	}

	return answer;
}

const parsingString = (parsingNum, targetString) => {
	const result = [];
	for (let i = 0; i < targetString.length; i += parsingNum) {
		result.push(targetString.substr(i, parsingNum));
	}
	return result;
};
