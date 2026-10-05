/*
맵에다가 표시를 해버리고 그만큼 나중에 빼버리기

10000 * 400
시뮬레이션
*/

function solution(rows, columns, queries) {
  var answer = [];

  const graph = Array.from({ length: rows }, () => Array(columns).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      graph[r][c] = r * columns + c + 1;
    }
  }

  for (const [x1, y1, x2, y2] of queries) {
    // 헷갈리므로 새로운 변수 선언
    const r1 = x1 - 1;
    const c1 = y1 - 1;
    const r2 = x2 - 1;
    const c2 = y2 - 1;

    const temp = [];

    for (let c = c1; c <= c2; c++) temp.push(graph[r1][c]);
    for (let r = r1 + 1; r <= r2 - 1; r++) temp.push(graph[r][c2]);
    for (let c = c2; c >= c1; c--) temp.push(graph[r2][c]);
    for (let r = r2 - 1; r >= r1 + 1; r--) temp.push(graph[r][c1]);

    // 마지막 값 빼기
    temp.unshift(temp.pop());
    const minVal = Math.min(...temp);
    let head = 0;

    // 회전하면서 넣어주기
    for (let c = c1; c <= c2; c++) graph[r1][c] = temp[head++];
    for (let r = r1 + 1; r <= r2 - 1; r++) graph[r][c2] = temp[head++];
    for (let c = c2; c >= c1; c--) graph[r2][c] = temp[head++];
    for (let r = r2 - 1; r >= r1 + 1; r--) graph[r][c1] = temp[head++];

    answer.push(minVal);
  }

  return answer;
}
