/* 로직
- 멜로디 중 샾 처리 -> replace로 치환 : changeChar함수 
  *#인 멜로디를 하나하나 객체로 만들어, for문으로 replace 
  -> #인 멜로디와 치환 값의 관계를 이용해, replace로 한번에 치환

- 들은 멜로디와 방송한 멜로디의 일치여부 -> 재생시간동안의 멜로디를 구해, 포함여부 체크 : checkMelody함수
  **멜로디를 직접구하지 않는 방법은 없을까? 고민해보기 */

function solution(m, musicinfos) {
    let answer = '';
    const correct = [];
    const listening = changeChar(m);

    for (let musicData of musicinfos) {
        const [start, end, title, melody] = musicData.split(',');
        const playTime = getExcuteTime(end, start);
        const newMelody = changeChar(melody);
        const flag = checkMelody(playTime, newMelody, listening);
        if (flag) {
            correct.push({ title, playTime });
        }
    }
    const resLen = correct.length;
    answer = resLen === 0 ? '(None)'
        : resLen === 1 ? correct[0].title
            : selectAnswer(correct);
    return answer;
}

function checkMelody(playTime, melody, listen) {
    let playingMelody = '';
    for (let i = 0; i < playTime; i++) {
        playingMelody += melody[i % melody.length];
    }
    return playingMelody.includes(listen) ? true : false;
}


function changeChar(str) {
    return str.replace(/\w#/g, a => a[0].toLowerCase());
    // const obj = {'C#': 'c', 'D#': 'd', 'F#': 'f', 'G#': 'g', 'A#': 'a'};
    // for(let i in obj) {
    //     const reg = new RegExp(i, 'g'); 
    //     str = str.replace(reg, obj[i]); 
    // }
    // return str; 
}

function getExcuteTime(end, start) {
    const [endHour, endMin] = parsingTime(end);
    const [startHour, startMin] = parsingTime(start);
    const hour = (endHour - startHour) * 60;
    const min = endMin - startMin;
    return hour + min;
}

function parsingTime(str) {
    return str.split(":").map((v) => parseInt(v));
}

function selectAnswer(arr) {
    const runTime = Math.max(...arr.map((v) => v.playTime));
    const musics = arr.filter((v) => v.playTime === runTime);
    return musics[0].title;
}

