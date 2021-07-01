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
    let no = foods.filter((food) => food < std);
    return no.length ? true : false;
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
