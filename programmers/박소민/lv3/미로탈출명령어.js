/*
어려운 시뮬레이션 냄새가 난다
일단 최단 거리로 이동 + 왕복 (du, lr)
*/

function solution(n, m, x, y, r, c, k) {
  var answer = [];

  const dr = [1, 0, 0, -1];
  const dc = [0, -1, 1, 0];

  // d -> l -> r -> u 사전 순
  const dir = ["d", "l", "r", "u"];

  // 최소 횟수 구하기
  let minD = Math.abs(r - x) + Math.abs(c - y);

  // 엣지 케이스: 도착할 수 없다면 impossible 반환
  if (minD > k) return "impossible";
  // k만큼 도착하기 위해서는 왔다 갔다 짝수번만큼 횟수가 는다.
  // 즉 거리 % 2 !== 횟수 % 2 -> 불가능
  else if (minD % 2 !== k % 2) return "impossible";

  // 0-index로 변환
  let cr = x - 1;
  let cc = y - 1;
  let cnt = k;

  const rEnd = r - 1;
  const cEnd = c - 1;

  // 횟수를 기준으로 돌린다.
  while (cnt > 0) {
    let isPossible = false;

    // 반복문으로 갈 수 있는 지 확인
    for (let i = 0; i < 4; i++) {
      const nr = cr + dr[i];
      const nc = cc + dc[i];

      const nd = Math.abs(nr - rEnd) + Math.abs(nc - cEnd);

      if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
      // [수정] 다음 좌표에서의 목표지점 과의 거리 d1, 남은 횟수 cnt1 비교
      // 1) d1 > cnt1 -> 실패
      // 2) d1 === cnt1 -> 최단 거리로만 이동
      // 3) d1 < cnt1 -> 왕복 가능!
      if (nd < cnt) {
        cr = nr;
        cc = nc;
        answer.push(dir[i]);
        isPossible = true;
        break;
      }
    }

    if (!isPossible) return "impossible";
    cnt--;
  }

  return answer.join("");
}
