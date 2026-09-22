function solution(info, n, m) {
  const len = info.length;

  let dp = Array(n).fill(Infinity);

  dp[0] = 0;

  // info를 모두 순회해야 하므로
  for (let i = 0; i < len; i++) {
    const [a, b] = info[i];

    // dp 배열을 순회하면서 이전 값을 갱신
    // 역순 + a가 먼저 훔치고 b가 훔치는 경우 갱신
    // 이유 : dp[j]의 오염 때문
    // (b가 이미 훔친 상황에서 a가 훔칠 수 있음)
    for (let j = n - 1; j >= 0; j--) {
      // 이전 것이 없다 -> 없다.
      if (dp[j] === Infinity) continue;

      const prevB = dp[j];

      // a가 훔치는 경우
      if (j + a < n) {
        dp[j + a] = Math.min(prevB, dp[j + a]);
      }

      // b가 훔치는 경우
      if (prevB + b < m) {
        dp[j] = prevB + b;
      } else {
        dp[j] = Infinity;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (dp[i] < m) {
      return i;
    }
  }

  return -1;
}
