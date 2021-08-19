// keyPoint: 중복허용 집합 
function solution(str1, str2) {
    let answer = 0;

    /* 집합 만들기 */
    const arr1 = parsing(str1.toLowerCase());
    const arr2 = parsing(str2.toLowerCase());

    /* 자카드 유사도 구하기 */
    if (arr1.length === 0 && arr2.length === 0) {
        answer = 1;
    } else {
        const inter = getInterSection(arr1, arr2);
        const union = arr1.length + arr2.length - inter;
        answer = inter / union;
    }
    return Math.floor(answer * 65536);
}

function parsing(str) {
    const res = [];
    const parsingNum = 2;
    let i = 0;

    while (i < str.length - 1) {
        const temp = str.substr(i, parsingNum);
        const checkChar = temp.match(/[\W\d]/g);
        if (!checkChar) { res.push(temp); }
        i++;
    }
    return res;
}

function getInterSection(a, b) {
    const checkInter = a.slice();
    let countInterElem = 0;

    for (let i of b) {
        if (checkInter.includes(i)) {
            checkInter.splice(checkInter.indexOf(i), 1);
            countInterElem++;
        }
    }
    return countInterElem;
}