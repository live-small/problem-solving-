/*
-조건
입차 후, 출차된 기록 없다면, 23:59 출차된 것 
*초과시간 / 단위시간 !== 0 -> 올림 

주차요금 계산 후 리턴 *차량번호 작은 것부터 

-아이디어
records로 주차한 시간 계산 ** 
 :분으로 바꿔서 빼면 되지 않을까? 
 
fees 이용해, 주차요금 계산 - {차량번호, 요금}
차량번호 순으로 오름차순 정렬, 요금 맵핑해서 리턴 
*/

function parsingTime(str) {
	return str.split(":").map((v) => parseInt(v));
}

function getDifferTime(end, start) {
	const [endHour, endMin] = parsingTime(end);
	const [startHour, startMin] = parsingTime(start);
	const hour = (endHour - startHour) * 60;
	const min = endMin - startMin;
	return hour + min;
}

function solution(fees, records) {
	const parkingTime = {};

	for (const record of records) {
		const [time, carId, type] = record.split(" ");
		if (type === "IN") {
			// 입차
			if (parkingTime[carId]) {
				parkingTime[carId].in.push(time);
			} else {
				parkingTime[carId] = { in: [time], useTime: 0 };
			}
		} else {
			// 출차
			// 입차기록 가져와서(pop), 시간계산 -> useTime 넣기
			const inTime = parkingTime[carId].in.pop();
			parkingTime[carId].useTime += getDifferTime(time, inTime);
		}
	}

	// 요금계산 > 만약, 출차기록 x -> 추가 누적 & 계산
	for (const [carId, list] of Object.entries(parkingTime)) {
		if (list.in.length > 0) {
			// 출차안한 것, 추가 누적 필요
			const inTime = list.in.pop();
			list.useTime += getDifferTime("23:59", inTime);
		}

		// 계산
		const [originTime, originFee, extraTime, extraFee] = fees;
		if (list.useTime <= originTime) {
			// 기본요금
			list.totalFee = originFee;
			continue;
		}

		// 추가요금
		list.totalFee =
			originFee +
			Math.ceil((list.useTime - originTime) / extraTime) * extraFee;
	}

	const answer = Object.entries(parkingTime)
		.sort((a, b) => Number(a[0]) - Number(b[0]))
		.map((v) => v[1].totalFee);
	return answer;
}
