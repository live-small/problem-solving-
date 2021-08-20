/* 문제 : https://programmers.co.kr/learn/courses/30/lessons/60058 */

function solution(p) {
    let answer = '';
    if (p.length < 1) { return p; }

    const reverse = { '(': ')', ')': '(' };
    function changeRight(p) {
        let [u, v] = parseBalance(p);
        let temp = '';
        if (checkRight(u)) {
            temp = v.length !== 0 ? changeRight(v) : '';
            return u + temp;
        } else {
            temp = v.length !== 0 ? `(${changeRight(v)})` : `()`;
            for (let i = 1; i < u.length - 1; i++) {
                temp += reverse[u[i]];
            }
        }
        return temp;
    }

    answer = changeRight(p);
    return answer;
}


/* 균형잡힌 문자열로 나누기 */
function parseBalance(str) {
    let balance = 0;
    const res = [];
    for (let i in str) {
        if (str[i] === '(') { balance++; }
        else { balance--; }

        if (balance === 0) {
            res.push(str.slice(0, Number(i) + 1));
            res.push(str.slice(Number(i) + 1));
            break;
        }
    }
    return res;
}

/* 올바른 문자열인지 체크 */
function checkRight(str) {
    const stack = [];
    for (let i of str) {
        if (i === '(') { stack.push(i); }
        else {
            let temp = stack.pop();
            if (!temp) { return false; }
        }
    }
    return stack.length === 0 ? true : false;
}