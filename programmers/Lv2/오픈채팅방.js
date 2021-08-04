function solution(record) {
    let answer = [];
    let nameLog = {};
    let templete = { 'Enter': '님이 들어왔습니다.', 'Leave': '님이 나갔습니다.' };
    record.forEach((senten) => {
        const [cmd, id, name] = senten.split(' ');
        if (cmd !== 'Leave') { nameLog[id] = name; }
    })

    for (let senten of record) {
        const [cmd, id, name] = senten.split(' ');
        if (!templete[cmd]) { continue; };
        answer.push(`${nameLog[id]}${templete[cmd]}`);
    }
    return answer;
}
