function solution(info, n, m) {
  const len = info.length;

  let dp = Array(n).fill(Infinity);

  dp[0] = 0;

  // info를 모두 순회해야 하므로
  for (let i = 0; i < len; i++) {
    const [a, b] = info[i];

    const nextDp = Array(n).fill(Infinity);

    // dp 배열을 순회하면서 이전 값을 갱신
    for (let j = 0; j < n; j++) {
      // 이전 것이 없다 -> 없다.
      if (dp[j] === Infinity) continue;

      const prevB = dp[j];

      // b가 훔치는 경우
      if (prevB + b < m) {
        // 이 부분이 이해가 안가. 왜 nextDp[j]랑 비교해야해?
        // info[i-1]를 꼭 훔쳐야 하잖아.
        nextDp[j] = Math.min(prevB + b, nextDp[j]);
      }

      // a가 훔치는 경우
      if (j + a < n) {
        // 이 부분도
        nextDp[j + a] = Math.min(prevB, nextDp[j + a]);
      }
    }

    dp = nextDp;
  }

  for (let i = 0; i < n; i++) {
    if (dp[i] < m) {
      return i;
    }
  }

  return -1;
}
