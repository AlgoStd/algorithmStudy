/*
설계
순서.
최소공배수 구한다음에 그 때까지 시간 증가시키면서 돌리기
그냥 단순하게 초로 계산
*/

function solution(signals) {
  const n = signals.length;

  const sumSignals = signals.map(([g, y, r]) => g + y + r);

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);

  const totalLcm = sumSignals.reduce((acc, val) => lcm(acc, val));

  for (let t = 1; t <= totalLcm; t++) {
    let isYellow = true;
    for (let i = 0; i < n; i++) {
      const [g, y, r] = signals[i];
      const sumSignal = sumSignals[i];
      const curr = (t - 1) % sumSignal;

      if (curr >= g && curr < g + y) continue;

      isYellow = false;
    }

    if (isYellow) return t;
  }

  return -1;
}
