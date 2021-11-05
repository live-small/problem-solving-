// 문제 링크: https://programmers.co.kr/learn/courses/30/lessons/49994

function solution(dirs) {
    let answer = 0;
    let prev = [0, 0];
    let firstPath = new Set();

    for (let cmd of [...dirs]) {
        // 계산 -> 체크 -> 업데이트 / 무시
        let moved = movePos(cmd, prev);
        if (Math.abs(moved[0]) > 5 || Math.abs(moved[1]) > 5) {
            continue;
        }
        firstPath.add(makePosForm(prev, moved));
        prev = moved;
    }

    answer = firstPath.size;
    return answer;
}

function movePos(cmd, pos) {
    switch (cmd) {
        case "U":
            return [pos[0], pos[1] + 1];
        case "D":
            return [pos[0], pos[1] - 1];
        case "R":
            return [pos[0] + 1, pos[1]];
        case "L":
            return [pos[0] - 1, pos[1]];
        default:
            console.log(`unvaild cmd ${cmd}`);
            break;
    }
}

function makePosForm(prev, cur) {
    let key = "";
    for (let i in prev) {
        key += Math.min(prev[i], cur[i]);
        key += Math.max(prev[i], cur[i]);
    }
    return key;
}
