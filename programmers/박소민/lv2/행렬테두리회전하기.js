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

    // 최솟값, 이전값, 다음값 변수 생성
    let prev = graph[r1 + 1][c1];
    let next;
    let minVal = prev;

    for (let c = c1; c <= c2; c++) {
      // 1. 현재 값 next에 저장
      next = graph[r1][c];

      // 2. 이전 값 회전해서 넣기
      graph[r1][c] = prev;

      // 3. 이전 값 갱신
      prev = next;

      // 이전값과 최솟값 갱신
      minVal = minVal > prev ? prev : minVal;
    }
    for (let r = r1 + 1; r <= r2 - 1; r++) {
      next = graph[r][c2];
      graph[r][c2] = prev;
      prev = next;
      minVal = minVal > prev ? prev : minVal;
    }
    for (let c = c2; c >= c1; c--) {
      next = graph[r2][c];
      graph[r2][c] = prev;
      prev = next;
      minVal = minVal > prev ? prev : minVal;
    }
    for (let r = r2 - 1; r >= r1 + 1; r--) {
      next = graph[r][c1];
      graph[r][c1] = prev;
      prev = next;
      minVal = minVal > prev ? prev : minVal;
    }

    answer.push(minVal);
  }

  return answer;
}
