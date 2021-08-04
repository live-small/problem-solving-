function solution(orders, course) {
    let answer = [];
    let list = {}; 
    for(let num of course) {
        list = {}; 
        for(let i of orders) {
            if(i.length < num) { continue; }
            let orderArr = [...i].sort(); 
            let kinds = combination(orderArr, num); 
            kinds.map((val) => {
                list[val] = list[val] ? list[val] + 1 : 1; 
            })
        }
        let max = 2; 
        let temp = []; 
        for(const prop in list) {
            if(list[prop] > max) {
                temp = [prop]; 
                max = list[prop]; 
            } else if(list[prop] === max) {
                temp.push(prop); 
            }
        }
        answer = answer.concat(temp); 
    }
    return answer.sort();
}


const combination = (arr, selectNum) => {
    let result = []; 
    if(selectNum === 1) { return arr }; 
    
    arr.forEach((fixer, idx) => {
        const rest = arr.slice(idx+1); 
        const combi = combination(rest, selectNum-1); 
        const added = combi.map((v) => fixer + v); 
        result.push(...added); 
    })
    
    return result; 
}
