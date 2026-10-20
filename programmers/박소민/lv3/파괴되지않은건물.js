/*
2차원 누적합

경계처리 할 것

길이 가로 세로 하나씩 늘려서 경계처리
*/

function solution(board, skill) {
  const n = board.length;
  const m = board[0].length;

  // 경계처리 편하게 하기 위해 +1
  const prefixSum = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (const [type, r1, c1, r2, c2, degree] of skill) {
    const attack = type === 1 ? -degree : degree;

    prefixSum[r2 + 1][c2 + 1] += attack;
    prefixSum[r1][c2 + 1] -= attack;
    prefixSum[r2 + 1][c1] -= attack;
    prefixSum[r1][c1] += attack;
  }

  // 누적합 - 열
  for (let r = 0; r <= n; r++) {
    for (let c = 1; c <= m; c++) {
      prefixSum[r][c] += prefixSum[r][c - 1];
    }
  }

  // 누적합 - 행
  for (let r = 1; r <= n; r++) {
    for (let c = 0; c <= m; c++) {
      prefixSum[r][c] += prefixSum[r - 1][c];
    }
  }

  let answer = 0;

  // 결과
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (prefixSum[r][c] + board[r][c] > 0) answer++;
    }
  }

  return answer;
}
