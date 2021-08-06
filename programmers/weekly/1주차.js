function solution(price, money, count) {
    const needToPrice = calculatePrice(price, count);
    const answer = needToPrice > money ? needToPrice - money : 0;
    return answer;
}

const calculatePrice = (price, count) => {
    return price * (1 + count) * (count / 2);
}

solution(3, 20, 4); // output: 10 