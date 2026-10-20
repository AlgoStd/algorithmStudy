// o(n^2) -> dp
// 기존에 있던 배열 활용 (아래 -> 위)

function solution(triangle) {
  // Bottom up 공간 최적화
  for (let h = triangle.length - 2; h >= 0; h--) {
    for (let c = 0; c <= h; c++) {
      // [수정] 축약문 사용하기
      triangle[h][c] += Math.max(triangle[h + 1][c + 1], triangle[h + 1][c]);
    }
  }

  return triangle[0][0];
}
