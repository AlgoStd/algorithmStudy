/*
설계
최소 소비 전력
50 * 1000 * 2^1000 (에어컨 키고 끄는 경우)
-> 완전 탐색 안됨

그렇다면 dp!
시간을 기준으로 한 dp

51 * 1000 * 50 (모든 온도 * onboard의 크기 * t1 ~ t2)

최적화 이전, 이후 dp 두 배열만 사용 (새로 선언 X)
*/

function solution(temperature, t1, t2, a, b, onboard) {
  const n = onboard.length;
  const offset = 10;

  // 인덱스 혼동을 위해 미리 보정
  const nt = temperature + offset;
  const nt1 = t1 + offset;
  const nt2 = t2 + offset;

  // 온도만을 기준으로 배열 선언
  let dp = Array(51).fill(Infinity);
  let nextDp = Array(51).fill(Infinity);

  dp[nt] = 0;

  // 승객 탑승을 기준으로 순회
  for (let i = 1; i < n; i++) {
    // 새로운 배열 초기회
    nextDp.fill(Infinity);

    // (추가) 탐색 최적화 (승객이 탑승한다면 nt1 ~ nt2 범위만 탐색)
    const minJ = onboard[i] === 1 ? nt1 : 0;
    const maxJ = onboard[i] === 1 ? nt2 : 50;

    // 소비전력이 결과값이므로 에어컨 끈 / 킨 경우 -> 온도 변화로 분기처리
    for (let j = minJ; j <= maxJ; j++) {
      // 1. 에어컨 끈 경우 - 실외온도 (유지, +1, -1)
      // 1) 유지
      if (j === nt && dp[j] !== Infinity) {
        nextDp[j] = Math.min(nextDp[j], dp[j]);
      }

      // 2) 실내온도가 올라가는 경우 <=> 현재온도 = 이전온도 - 1
      if (j - 1 < nt && j - 1 >= 0 && dp[j - 1] !== Infinity) {
        nextDp[j] = Math.min(nextDp[j], dp[j - 1]);
      }

      // 3) 실내온도가 올라가는 경우 <=> 현재온도 = 이전온도 - 1
      if (j + 1 > nt && j + 1 >= 0 && dp[j + 1] !== Infinity) {
        nextDp[j] = Math.min(nextDp[j], dp[j + 1]);
      }

      // 2. 에어컨 킨 경우 - 실외온도 (유지, +1, -1)
      // 1) 유지
      if (dp[j] !== Infinity) {
        nextDp[j] = Math.min(nextDp[j], dp[j] + b);
      }

      // 2) 실내온도가 올라가는 경우 <=> 현재온도 = 이전온도 - 1
      if (j - 1 >= 0 && dp[j - 1] !== Infinity) {
        nextDp[j] = Math.min(nextDp[j], dp[j - 1] + a);
      }

      // 3) 실내온도가 올라가는 경우 <=> 현재온도 = 이전온도 - 1
      if (j + 1 >= 0 && dp[j + 1] !== Infinity) {
        nextDp[j] = Math.min(nextDp[j], dp[j + 1] + a);
      }
    }

    // 참조 때문에 새로운 상수를 선언하여 옮긴다.
    let temp = dp;
    dp = nextDp;
    nextDp = temp;
  }

  return Math.min(...dp);
}
