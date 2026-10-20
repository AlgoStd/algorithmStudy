// o(n^2) -> 1차원 dp
// 1. 이전, 다음 상태 갱신 (dp에는 이동한 경로 값의 합이 담겨져 있음)
// 2. 전이규칙 윗 값이 아래에 옮김 (자기 자신 인덱스, 자기자신 인덱스 +1)
// 3. 자료구조 배열
// 4. 복잡도 o(n)

function solution(triangle) {
  const n = triangle.length;

  let prev = Array(n).fill(0);
  const next = Array(n).fill(0);

  prev[0] = triangle[0][0];

  for (let h = 1; h < n; h++) {
    for (let c = 0; c <= h; c++) {
      if (c === 0) {
        next[c] = triangle[h][c] + prev[c];
      } else if (c === h) {
        next[c] = triangle[h][c] + prev[c - 1];
      } else {
        next[c] = Math.max(
          triangle[h][c] + prev[c],
          triangle[h][c] + prev[c - 1],
        );
      }
    }

    prev = [...next];
  }

  let answer = 0;

  for (const val of prev) {
    if (val > answer) answer = val;
  }

  return answer;
}
