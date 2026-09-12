/*
설계
그리디 -> 가장 먼 곳부터 앞으로 온다.
인덱스로 순회
방문 완료한 수 변수로 둬서 = n -> return
*/

function solution(cap, n, deliveries, pickups) {
  var answer = 0;

  let di = n - 1;
  let pi = n - 1;

  let box = 0;

  while (di >= 0 || pi >= 0) {
    // 배달, 수거 시작 인덱스 구하기
    while (di >= 0 && deliveries[di] === 0) {
      di--;
    }

    while (pi >= 0 && pickups[pi] === 0) {
      pi--;
    }

    // 왕복 거리 갱신 0-index 이므로 + 1
    answer += (Math.max(di, pi) + 1) * 2;

    // 가면서 배달 먼저
    while (di >= 0) {
      if (box + deliveries[di] <= cap) {
        box += deliveries[di];
      } else {
        // 배달해야 하는 남은 상자 수 저장
        deliveries[di] -= cap - box;
        break;
      }

      di--;
    }

    // 배달 완료
    box = 0;

    // 돌아오면서 수거
    while (pi >= 0) {
      if (box + pickups[pi] <= cap) {
        box += pickups[pi];
      } else {
        // 수거해야 하는 남은 상자 수 저장
        pickups[pi] -= cap - box;
        break;
      }

      pi--;
    }

    // 수거 완료
    box = 0;
  }

  return answer;
}
