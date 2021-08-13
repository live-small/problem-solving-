/* 유일한 최소,최대값 찾는 로직
: 최대, 최소값인지 체크 -> 유니크한 값인지 체크 */

function solution(scores) {
    let answer = '';
    scores = changeDirection(scores);
    for (let i in scores) {
        const max = Math.max(...scores[i]);
        const min = Math.min(...scores[i]);
        const self = scores[i][i];
        if (self === max || self === min) {
            const dupliCheck = scores[i].some((v, idx) => {
                if (+i !== idx) {
                    return v === self ? true : false;
                }
            })
            // 유니크한 값일때만, 제외 
            if (!dupliCheck) { scores[i].splice(i, 1); }
        }
        const sum = scores[i].reduce((a, b) => a + b);
        answer += scoreStd(sum / scores[i].length);
    }
    return answer;
}


function changeDirection(arr) {
    return arr.reduce((res, row) => {
        return row.map((v, i) => [...res[i] || [], row[i]])
    }, []);
}


function scoreStd(score) {
    switch (true) {
        case (score < 50):
            return 'F';
        case (score < 70):
            return 'D';
        case (score < 80):
            return 'C';
        case (score < 90):
            return 'B';
        case (score >= 90):
            return 'A';
    }
}