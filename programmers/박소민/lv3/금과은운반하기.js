/*
시간복잡도 줄이기
시간기준 이분탐색?
dp 안됨. -> 최적해 보장? + 공간복잡도
그리디 안됨. -> 최소 보장 X
완전 탐색 안됨 -> 시간복잡도

판단하지 못한 부분 -> 각각의 트럭은 병렬로 움직인다.
*/

function solution(a, b, g, s, w, t) {
  const n = g.length;
  var answer = -1;

  let start = 0;
  let end = 10 ** 5 * 2 * (a + b); // 그냥 최대 시간으로 할 것

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    // **반대로 풀기** 시간 고정
    // **생각하지 못한 부분**
    // 금만 채굴하는 경우, 은만 채굴하는 경우, 둘 다 적절히 채굴하는 경우
    // 안의 과정은 알 수 없으므로 이렇게 엣지 케이스를 구해서
    // 세 가지 경우에 모두 구할 수 있는 경우 -> true를 반환한다.
    let gold = 0;
    let silver = 0;
    let both = 0;

    for (let i = 0; i < n; i++) {
      // 1) 제한 시간 안에 채굴할 수 있는 최대 왕복 횟수 구하기
      let maxTimes = Math.floor(mid / (t[i] * 2));

      // 나머지가 편도 시간 보다 크다면 -> 왕복 횟수 + 1
      if (mid % (t[i] * 2) >= t[i]) maxTimes++;

      // 최대 무게 구하기
      const maxWeight = maxTimes * w[i];

      gold += Math.min(g[i], maxWeight);
      silver += Math.min(s[i], maxWeight);
      both += Math.min(g[i] + s[i], maxWeight);
    }

    if (gold >= a && silver >= b && both >= a + b) {
      answer = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return answer;
}
