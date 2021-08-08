function solution(info, query) {
    let answer = [];

    // info 가공 
    for (let i in info) {
        info[i] = info[i].split(' ');
    }

    // query 가공 
    for (let j in query) {
        query[j] = query[j].replace(/\sand/g, '').split(' ');
    }

    // - 범위 순회 
    query.forEach((q, i) => {
        const scoreIdx = 4;
        let count = 0;
        for (let z = 0; z < info.length; z++) {
            let flag = false;
            for (let s = 0; s < q.length - 1; s++) {
                flag = false;
                if (q[s] === '-' || q[s] === info[z][s]) { flag = true; }
                else { break; }
            }
            if (flag && +q[scoreIdx] <= +info[z][scoreIdx]) { count++; }
        }
        answer.push(count);
    })
    return answer;
}

const i = ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"];
const q = ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"];
// solution(i, q);

