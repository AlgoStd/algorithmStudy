function solution(N, stages) {
  // 전체 사람 수
  const m = stages.length;
  var answer = [];

  // [수정] : stages에는 1 이상 N + 1이하의 자연수
  const levels = Array(N + 2).fill(0);

  for (const stage of stages) {
    levels[stage]++;
  }

  // 도전한 사람 수
  let num = m;
  for (let i = 1; i <= N; i++) {
    // [수정] num이 0인 경우는 NaN을 반환하므로 분기처리.
    answer.push([i, num !== 0 ? levels[i] / num : 0]);
    num -= levels[i];
  }

  // 내림차순 정렬
  // [수정] 하면 좋은 것 -> 혹시나 모르니 a[0] - b[0]도 할 것
  answer.sort((a, b) => b[1] - a[1] || a[0] - b[0]);

  return answer.map((v) => v[0]);
}
