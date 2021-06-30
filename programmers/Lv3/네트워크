let visited = [];

function dfs(matrix, vertex) {
    visited.push(vertex);
    for (let j in matrix[vertex]) {
        if (vertex != j && matrix[vertex][j] && !visited.includes(j)) {
            dfs(matrix, j);
        }
    }
}

function solution(n, computers) {
    let answer = 0;
    for (let i in computers) {
        if (!visited.includes(i)) {
            dfs(computers, i);
            answer++;
        }
    }
    return answer;
}
