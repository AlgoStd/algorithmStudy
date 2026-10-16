/*
설계: 최소 비용 안에서 보물 찾기
dp 항상 최악의 비용을 고려해야 하게 때문에
미리 이중 반복으로 순회하면서 계산해 놓기.

0, 1, 2
하나만 판단하면 된다.
*/

function solution(depth, money, excavate) {
  const n = depth.length;

  // [left][right]까지의 비용
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => [Infinity, -1]),
  );

  // 구간의 길이가 0인 경우 depth
  for (let start = 0; start < n; start++) {
    dp[start][start][0] = depth[start];
    dp[start][start][1] = start;
  }

  // 구간의 길이 -> 시작점 -> 구간안의 k
  for (let len = 1; len < n; len++) {
    for (let start = 0; start + len < n; start++) {
      let curr = dp[start][start + len][0];
      let i = dp[start][start + len][1];

      for (let k = start; k <= start + len; k++) {
        let contrast = Infinity;

        // 오른쪽만 고려
        if (k === start) {
          contrast = depth[k] + dp[start + 1][start + len][0];
        }
        // 왼쪽만 고려
        else if (k === start + len) {
          contrast = depth[k] + dp[start][start + len - 1][0];
        }
        // 나머지
        else {
          contrast =
            depth[k] + Math.max(dp[start][k - 1][0], dp[k + 1][start + len][0]);
        }

        // 최악의 비용 산출
        if (curr > contrast) {
          i = k;
          curr = contrast;
        }
      }

      dp[start][start + len][0] = curr;
      dp[start][start + len][1] = i;
    }
  }

  // dp 완성 후 excavate 실행
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    // 현재 비용이 최소인 인덱스 구하기
    const idx = dp[left][right][1];

    // 검사하기 1-index로 변환
    const result = excavate(idx + 1);

    if (result === 0) return idx + 1;
    else if (result === -1) {
      right = Math.max(0, idx - 1);
    } else if (result === 1) {
      left = Math.min(n - 1, idx + 1);
    }
  }

  return 0;
}
