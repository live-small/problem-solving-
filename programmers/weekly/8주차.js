function solution(sizes) {
    let answer = 0;
    let pocket = { 'width': 0, 'height': 0 };
    sizes.map((size) => {
        const [w, h] = size.sort((next, cur) => next - cur);
        if (pocket.width < w) pocket.width = w;
        if (pocket.height < h) pocket.height = h;
    })
    answer = pocket.width * pocket.height;
    return answer;
}