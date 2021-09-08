function solution(weights, head2head) {
    let answer = [];
    const temp = weights.map((weight, order, arr) => {
        let [rateOfWin, numOfWin] = getDataOfWin(order, arr, head2head);
        return { weight, rateOfWin, numOfWin, order: order + 1 };
    })
    temp.sort((next, cur) => sorting(next, cur));

    answer.push(...temp.map((v) => v.order));
    return answer;
}



/* 승률구하기 */
function getDataOfWin(idx, arr, hist) {
    const data = { 'total': 0, 'win': 0, 'anotherWin': 0 };

    for (let i in hist[idx]) {
        if (idx === Number(i) || hist[idx][i] === 'N') { continue; }
        data.total++;
        if (hist[idx][i] === 'W') {
            data.win++;
            if (arr[idx] < arr[i]) { data.anotherWin++; }
        }
    }
    return [data.win / (data.total || 1), data.anotherWin];
}

const sorting = (next, cur) => {
    return cur.rateOfWin - next.rateOfWin
        || cur.numOfWin - next.numOfWin
        || cur.weight - next.weight
        || next.order - cur.order;
}