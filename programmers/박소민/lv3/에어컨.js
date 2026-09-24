/*
설계
빡 구현처럼 보인다.
최소 소비 전력
50 * 1000 * 2^1000 (에어컨 키고 끄는 경우)
-> 완전 탐색 안됨

그렇다면 dp!
시간을 기준으로 한 dp

51 * 1000 * 50 (모든 온도 * onboard의 크기 * t1 ~ t2)

방법2 최적화
-> 어차피 이전 값만 알고 있으면 되니까 굳이 시간을 사용하지 않아도 되지 않을까?
-> 실내온도를 기준으로 1차원 배열 선언
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

  dp[nt] = 0;

  // 승객 탑승을 기준으로 순회
  for (let i = 1; i < n; i++) {
    const newDp = Array(51).fill(Infinity);

    // 이전 시간을 기준으로 -1, 0, 1로 현재 시간에 따른 실내온도 측정
    // 온도를 1도씩 올리면서 순회
    for (let j = 0; j <= 50; j++) {
      // 예외 처리 - 사람 탑승 && 조건에 맞지 않는 온도 -> continue
      // Q1 : Infinity 처리 안 해도 되는가?
      if (onboard[i] === 1 && (nt1 > j || nt2 < j)) continue;

      // 1. 이전 온도 === 현재 온도 (유지되는 경우)
      if (dp[j] !== Infinity) {
        // 1) 에어컨 끈 경우 - 실외온도 === 실내온도
        if (j === nt) {
          newDp[j] = Math.min(newDp[j], dp[j]);
        }

        // 2) 에어컨을 킨 경우 (실내온도 === 희망온도)
        newDp[j] = Math.min(newDp[j], dp[j] + b);
      }

      // 2. 이전 온도 === 현재 온도 - 1 (온도가 낮아짐)
      if (j + 1 <= 50 && dp[j + 1] !== Infinity) {
        // 1) 에어컨 끈 경우 (실내온도 > 실외온도)
        if (j + 1 > nt) {
          newDp[j] = Math.min(newDp[j], dp[j + 1]);
        }

        // 2) 에어컨을 킨 경우 (실내온도 < 희망온도)
        newDp[j] = Math.min(newDp[j], dp[j + 1] + a);
      }

      // 3. 이전 온도 === 현재 온도 + 1 (온도가 높아짐)
      if (j - 1 >= 0 && dp[j - 1] !== Infinity) {
        // 1) 에어컨 끈 경우 (실내온도 < 실외온도 )
        if (j - 1 < nt) {
          newDp[j] = Math.min(newDp[j], dp[j - 1]);
        }

        // 2) 에어컨을 킨 경우 (실내온도 < 희망온도)
        newDp[j] = Math.min(newDp[j], dp[j - 1] + a);
      }
    }

    dp = newDp;
  }

  return Math.min(...dp);
}
