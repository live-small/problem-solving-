// 아스키코드 -> 숫자 : charCodeAt
function solution(name) {
    let answer = 0;
    if (name.length === 1) {
        /* 커서이동 고려 x */
        answer = getMinDiffer(name);
    } else {
        /* 커서이동 고려 o */
        const arr = [...name];
        let numOfCursorMove = 0;

        // 커서이동 방향 2가지 -> <-  *결정기준: A 위치
        if (!arr.includes("A")) {
            // A 없으면 커서방향 상관없음.
            numOfCursorMove = arr.length - 1;
        } else {
            // 커서방향 체크
            const haveToMoveValue = arr.filter((char) => char !== "A");
            const i = haveToMoveValue.length - 1;
            // ->
            const rightDir = arr.indexOf(haveToMoveValue[i]);
            // <-
            const leftDir = Math.abs(arr.lastIndexOf(haveToMoveValue[0]));
            numOfCursorMove = Math.min(rightDir, leftDir + 1);
        }
        const amoutMoving = arr.map((v) => getMinDiffer(v));
        answer =
            numOfCursorMove + amoutMoving.reduce((res, cur) => res + cur, 0);
    }
    return answer;
}

// 이동거리 구해주는 함수
const getDiffer = (a, b) => {
    return Math.abs(a.charCodeAt() - b.charCodeAt());
};

// 이동거리의 최소값을 구해주는 함수
const getMinDiffer = (char) => {
    const DifferVal = getDiffer(char, "A");
    const totalRange = getDiffer("A", "Z") + 1;
    const midPoint = totalRange / 2;

    return DifferVal <= midPoint ? DifferVal : totalRange - DifferVal;
};

// 테스트 코드
const input = "JEROEN";
const answer = solution(input); // 56
