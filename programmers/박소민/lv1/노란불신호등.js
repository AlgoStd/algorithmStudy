/*
    설계
    최소공약수, 최소공배수 (유클리드 호제법 그냥 외우자)
    최소 공약수 -> 계속 나눠서 0이 되는 바로 전 값
    72, 30 -> 30, 12(나머지) -> 12, 6 -> 6, 0 => 6

    전체 최소공배수를 구한다음에
    최소 공배수 시간 안에 노란색이 있다면 성공
    시간이므로 현재 신호등 = (t-1) % (자신의 주기 G + Y + R)
    G <= 현재 신호등 < G + Y (등호 디버깅 시 고려)
    */

function solution(signals) {
  const n = signals.length;

  // 1. 필요한 화살표 함수 생성
  // 최소 공약수 일단 외움 - 설명
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  // 최소 공배수 당연하게 두 개 곱한거 나누기 최소 공약수
  const lcm = (a, b) => (a * b) / gcd(a, b);

  // 2. 현재 주기를 파악하기 위한 새로운 배열 생성
  const totalSignals = signals.map(([g, y, r]) => g + y + r);

  // 3. 전체 최소공배수 파악
  const totalLcm = totalSignals.reduce((acc, val) => lcm(acc, val));

  // 4. 시간을 1초부터 전체 최소공배수 시간까지 돌리면서 모두 노란불 되는지 파악
  // 시간은 경과 시간을 세는 것이기에 1-index
  for (let t = 1; t <= totalLcm; t++) {
    let isYellow = true;

    for (let i = 0; i < n; i++) {
      // curr는 0-index -> t - 1
      const curr = (t - 1) % totalSignals[i];
      const [g, y, r] = signals[i];

      if (g > curr || curr >= g + y) {
        isYellow = false;
        break;
      }
    }

    if (isYellow) return t;
  }

  return -1;
}
