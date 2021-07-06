let params = [['어제', '오늘', '내일'], ['우리', '경래', '지호'], ['는', '에게', '가'], ['신발을', '가방을', '핸드폰을']];

function addV(senten) {
    let parsing = senten.match(/^[가-힣]{2}/g);
    // console.log(parsing);
    switch (parsing[0]) {
        case '어제':
            return senten += ' 샀었다';
        case '오늘':
            return senten += ' 샀다';
        case '내일':
            return senten += ' 살것이다';
        default:
            console.log(`not provided this tense`);
            break;
    }
}

function solution(arr) {
    let r = arr.length; // row
    let c = arr[0].length; // column
    let newArr = Array.from(new Array(c), () => new Array(r).fill(''));
    // 행,열 바꾸기 
    // - for문 
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            [newArr[j][i]] = [arr[i][j]];
        }
    }
    // - API 활용
    // newArr = newArr.reduce((result, cur) => cur.map((char, idx) => {
    //     return [...(result[idx] || []), cur[idx]];
    // }), []);

    for (let sentence in newArr) {
        newArr[sentence] = newArr[sentence].join(' ');
    }
  
    let res = [];
    for (let sen in newArr) {
        // 시제에 맞는 동사 추가 
        newArr[sen] = addV(newArr[sen]);
        let temp = '';
        for (let i = 0; i < newArr[sen].length; i++) {
            if (i == 5) { continue; }
            temp += newArr[sen][i];
        }
        res.push(temp);
    }
    return res;
}

let answer = solution(params);
// console.log(answer);


