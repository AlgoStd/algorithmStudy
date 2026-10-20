// o(n^3) -> 2차원 dp
// 1. 상태 dp[n] 갱신 (dp에는 이동한 경로 값의 합이 담겨져 있음)
// 2. 전이규칙 윗 값이 아래에 옮김 (자기 자신 인덱스, 자기자신 인덱스 +1)
// 3. 자료구조 배열
// 4. 복잡도 o(n^2)

function solution(triangle) {
  const n = triangle.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  dp[0][0] = triangle[0][0];

  for (let h = 1; h < n; h++) {
    for (let c = 0; c <= h; c++) {
      if (c === 0) {
        dp[h][c] = triangle[h][c] + dp[h - 1][c];
      } else if (c === h) {
        dp[h][c] = triangle[h][c] + dp[h - 1][c - 1];
      } else {
        dp[h][c] = Math.max(
          triangle[h][c] + dp[h - 1][c],
          triangle[h][c] + dp[h - 1][c - 1],
        );
      }
    }
  }

  let answer = 0;

  for (const val of dp[n - 1]) {
    if (val > answer) answer = val;
  }

  return answer;
}
