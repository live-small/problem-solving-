function solution(table, languages, preference) {
    let answer = '';
    let max = Number.MIN_VALUE;

    table.forEach((row) => {
        const [job, ...lang] = row.split(' ');
        let sum = 0;
        for (let l in languages) {
            const score = lang.indexOf(languages[l]);
            if (score !== -1) {
                sum += (lang.length - score) * preference[l];
            }
        }
        if (sum > max) {
            max = sum;
            answer = job;
        } else if (sum === max) {
            answer = [answer, job].sort()[0];
        }
    })
    return answer;
}