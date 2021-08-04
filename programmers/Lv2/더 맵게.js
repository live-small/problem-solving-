/* 
1. 문제설명 
스코빌 지수(기준:맵기)가 담긴 배열과 기준 값이 주어질 때, 
주어진 기준값보다 스코빌 지수가 높도록 만들어야한다. 

*문제에서 주어진 로직: 
스코빌 지수가 가장 작은 값(1)
두번째로 작은 값을 두배한 값(2)을 더해
스코빌 지수를 높인다.  

2. 풀이: 최소값을 찾기 쉽도록, 우선순위 큐를 구현해 이용
*/

class priorityQueue {
    constructor(arr) {
        this.arr = arr;
    }
    inqueue(value) {
        this.arr.push(value);
    }

    dequeue() {
        let i = 0;
        let min = this.arr[i];
        for (let idx in this.arr) {
            if (min > this.arr[idx]) {
                min = this.arr[idx];
                i = idx;
            }
        }
        this.arr.splice(i, 1);
        return min;  
    }
}

function test(foods, std) {
    let lackSpicy = foods.filter((food) => food < std);
    return lackSpicy.length ? true : false;
}

function solution(scovile, K) {
    let count = 0;
    if (!test(scovile, K)) {
        return 0;
    }
    let pq = new priorityQueue(scovile);
    while (pq.arr.length) {
        let check = test(pq.arr, K);
        if (!check) {
            return count;
        }
        let first = pq.dequeue();
        let second = pq.dequeue();
        pq.inqueue(first + (second * 2));
        count++;
    }
    return -1;
}

// 테스트*
// let scov = [2, 3, 5, 7];
// let scov1 = [1, 2, 3, 9, 10, 12];
// let res = solution(scov, 5);
// console.log(res);
