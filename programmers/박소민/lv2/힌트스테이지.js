/*
설계
수가 적으니 완전 탐색
dfs + 백트래킹

하나의 단계에서는 힌트를 사기 / 안 사기
2^n -> 비트마스킹도 가능
힌트가 있다면 -> 무조건 최대한 사용
(힌트권을 많이 사용할수록 비용이 줄기 때문)
*/

function solution(cost, hint) {
  const n = cost.length;
  const k = hint[0].length;
  var answer = Infinity;

  // 0-index
  const hints = Array(n).fill(0);

  // level도 0-index
  const dfs = (level, price) => {
    // 1. level이 n단계라면 반환
    if (level >= n) {
      answer = Math.min(answer, price);
      return;
    }

    // 2. 현재 단계에서 힌트가 있다면 모두 사용
    const num = Math.min(hints[level], n - 1);
    let nPrice = price + cost[level][num];

    // 3. 힌트를 사는 경우, 사지 않는 경우 갱신
    // 1) 힌트 사지 않는 경우
    dfs(level + 1, nPrice);

    // 2) 힌트를 사는 경우
    if (level < n - 1) {
      nPrice += hint[level][0];

      for (let i = 1; i < k; i++) {
        // 스테이지 0-index로 변환
        const target = hint[level][i] - 1;
        hints[target]++;
      }

      dfs(level + 1, nPrice);

      for (let i = 1; i < k; i++) {
        // 스테이지 0-index로 변환
        const target = hint[level][i] - 1;
        hints[target]--;
      }
    }
  };

  dfs(0, 0);

  return answer;
}
