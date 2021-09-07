/*
1. 문제 링크: https://programmers.co.kr/learn/courses/30/lessons/42583 
2. 접근방법 
- 케이스 분류 
  1) default 케이스: 다리에 있는 트럭 이동, 다리를 다 건넌 트럭 빼기 
  2) 다리에 자리, 여유가 있을 경우: 대기하고 있는 트럭 넣어주기 
*/

// 처음 짠 코드 
// : 작동과정을 하나하나 구현해, 다리가 길 때 시간이 오래 걸림. 
/* function solution(bridge_length, weight, truck_weights) {
    let timer = 0;
    let currentBriage = [];
    while (currentBriage.length || truck_weights.length) {
        // default : 다리에 있는 트럭, 이동 & 다온 트럭, shift 
        if (currentBriage.length !== 0) {
            currentBriage = currentBriage.map((truck) => ({ ...truck, 'moving': truck.moving + 1 }));
            if (currentBriage[0].moving === bridge_length) { currentBriage.shift(); }
        }
        // 자리, 무게 여유가 있다 ? 다음 트럭 넣어주기 
        if (truck_weights.length && currentBriage.length < bridge_length) {
            const temp = weight - sum(currentBriage.map((v) => v.weight));
            const nextTruckWeight = truck_weights[0];
            if (temp >= nextTruckWeight) {
                currentBriage.push({
                    weight: truck_weights.shift(),
                    moving: 0,
                });
            }
        }
        timer++;
    }
    return timer;
}

function sum(arr) {
    return arr.reduce((res, cur) => res + cur, 0);
} */

// ✨ 수정한 코드 
// : 다리 길이가 길어도 오래걸리지 않게 ! 
// - 다리가 버틸 수 있는 무게 때문에, 다음 트럭이 못온다면 다리 위 선두 트럭이 나갈 때의 시간으로 바꾸기 
// - 그러기 위해선, 다리 내 움직인 거리를 할당(moving) -> 나갈 때 시간을 할당(endTime)
// 참고: 프로그래머스 - 다른사람 풀이 

function solution(bridge_length, weight, truck_weights) {
    let time = 0;
    let currentBriage = []; // 다리 위에 있는 트럭정보 
    let bridge_weight = 0; // 다리 위의 무게 
    while (currentBriage.length || truck_weights.length) {
        // 다리 위 선두트럭이 나갈 시간이면, 보내주기 
        if (currentBriage[0] && currentBriage[0].endTime === time) {
            bridge_weight -= currentBriage.shift().weight;
        }

        if (bridge_weight + truck_weights[0] <= weight) {
            currentBriage.push({
                weight: truck_weights[0],
                endTime: time + bridge_length,
            });
            bridge_weight += truck_weights.shift();
        } else {
            if (currentBriage[0]) {
                time = currentBriage[0].endTime - 1;
            }
        }
        time++;
    }
    return time;
}
// 테스트 코드 
solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]); // 110