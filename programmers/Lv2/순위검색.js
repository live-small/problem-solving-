// 테스트 케이스
const i = ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"];
const q = ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"];
solution(i, q);

/* 
1. 풀이설명
 1) 지원자 정보를 key, 채점점수 value로 나눈다. 
이때, '-'(해당조건을 고려하지 않음)을 처리하기 위해, 지원자 정보에서 만들 수 있는 케이스를 db에 저장한다.
*조합 이용 

 2) 쿼리의 값도 정보를 key, 채점점수를 value로 가공한 후, 
지원자 정보가 있는 db에 key로 접근한다.
이때, 쿼리의 채점점수(value)이상의 값만 카운팅하기 위해, 이분탐색으로 시작인덱스를 구한다. 
*value는 지원자의 채점점수가 오름차순으로 정렬돼 있기에, value.length - 시작인덱스로 만족하는 지원자 수를 구한다. 


2. 고민했던 부분
 1) 문자열 파싱 
가능한 조합 폼을 만들어 재활용한다. 
조합 폼의 원소를 인덱스로 이용해, 값을 바꾼다. 

 2) 효율성 
필요한 부분에 대해서만 정렬하는게 
전체를 정렬하는 것보다 나을 거라고 생각했었다.
*아래 코드 주석 참고
*/

function solution(info, query) {
    const answer = [];
    const db = {};
    const combi = [''];

    // 가능한 조합 폼 만들기
    const combiForm = info[0].split(" ").slice(0, 4); // 2 - 1)
    for (let j in combiForm) {
        combi.push(...combination(combiForm.map((v, i) => i), +j + 1));
    }

    // 지원자정보를 변경한 후 db에 삽입
    for (let person of info) {
        const array = person.split(" ");
        const score = array.pop();
        combi.forEach((v) => {
            const temp = [...array];
            for (let i of [...v]) {
                temp[+i] = '-';
            }
            const key = `${temp.join("")}`;
            db[key] ? db[key].push(+score)
                : db[key] = [+score];
        })
    }

    // 채점점수를 기준으로 오름차순 정렬
    for (let s in db) {
        db[s].sort((a, b) => a - b);
    }

    // 질의수행
    for (let q of query) {
        const array = q.replace(/\sand/g, '').split(' ');
        const score = array.pop();
        const key = array.join("");
        if (!db[key]) {
            answer.push(0);
            continue;
        } else {
            // db[key].sort((a,b) => a - b); 
            // 2 - 2) 효율성
            // Q. 왜 시간초과일까? 필요한 값만 정렬하는게
            // A. 같은 쿼리가 n개면, n번 정렬 < 미리 정렬해두면, 최대 1번
            const startIdx = BinarySearch(db[key], score);
            answer.push(db[key].length - startIdx);
        }
    }
    return answer;
}

function BinarySearch(arr, std) {
    let start = 0;
    let end = arr.length;
    while (start < end) {
        const mid = Math.floor((start + end) / 2);
        if (arr[mid] < std) { start = mid + 1 }
        else { end = mid };
    }
    return start;
}


function combination(data, num) {
    const res = [];
    if (num === 1) { return data.map((v) => `${v}`); }
    data.forEach((fixer, i) => {
        const rest = data.slice(i + 1);
        const temp = combination(rest, num - 1);
        const added = temp.map((v) => fixer + v);
        res.push(...added);
    })
    return res;
}




// - 첫번째 시도; 정확성 pass & 효율성 out 
// function solution(info, query) {
//     let answer = [];

//     // info 가공 
//     for (let i in info) {
//         info[i] = info[i].split(' ');
//     }

//     // query 가공 
//     for (let j in query) {
//         query[j] = query[j].replace(/\sand/g, '').split(' ');
//     }

//     // - 범위 순회 
//     query.forEach((q, i) => {
//         const scoreIdx = 4;
//         let count = 0;
//         for (let z = 0; z < info.length; z++) {
//             let flag = false;
//             for (let s = 0; s < q.length - 1; s++) {
//                 flag = false;
//                 if (q[s] === '-' || q[s] === info[z][s]) { flag = true; }
//                 else { break; }
//             }
//             if (flag && +q[scoreIdx] <= +info[z][scoreIdx]) { count++; }
//         }
//         answer.push(count);
//     })
//     return answer;
// }