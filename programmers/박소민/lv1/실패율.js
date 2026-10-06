function solution(N, stages) {
  // 전체 사람 수
  const m = stages.length;
  var answer = [];

  const levels = Array(N + 1).fill(0);

  for (const stage of stages) {
    levels[stage]++;
  }

  // 도전한 사람 수
  let num = m;
  for (let i = 1; i <= N; i++) {
    answer.push([i, levels[i] / num]);
    num -= levels[i];
  }

  // 내림차순 정렬
  answer.sort((a, b) => b[1] - a[1]);

  return answer.map((v) => v[0]);
}
