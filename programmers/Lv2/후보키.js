// 고민한 포인트: 최소성 만족  
function solution(relation) {
    let answer = 0;

    /* 가능한 조합 찾기 */
    const combi = [];
    const attributeIdx = relation[0].map((v, i) => String(i));
    for (let j = 1; j <= attributeIdx.length; j++) {
        combi.push(...getCombination(attributeIdx, j));
    }

    /* 유일성 체크 */
    const uniqueKey = [];
    for (let attribute of combi) {
        if (checkUnique(relation, attribute)) { uniqueKey.push(attribute); }
    }

    /* 최소성 체크 - 부분집합 */
    let keyLen = uniqueKey.length;
    for (let i in uniqueKey) {
        const key = uniqueKey[i];
        const flag = uniqueKey.some((val, idx) => idx !== +i && key.includes(val));
        if (flag) { keyLen--; }
    }
    answer = keyLen;
    return answer;
}


function getCombination(target, radix) {
    const res = [];
    if (radix === 1) { return target; }
    target.forEach((fixed, idx, arr) => {
        const rest = arr.slice(idx + 1);
        const restArr = getCombination(rest, radix - 1);
        // const combi = restArr.map((v) => fixed + v);
        const combi = restArr.map((v) => (fixed + v).split('').sort((a, b) => a - b).join(''));
        res.push(...combi);
    })
    return res;
}


function checkUnique(db, attribute) {
    let temp = [];
    attribute = [...attribute].map((v) => Number(v));

    for (let tuple of db) {
        let key = '';
        for (let a of attribute) {
            key += tuple[a];
        }
        if (temp.includes(key)) { return false; }
        else { temp.push(key); }
    }
    return true;
}