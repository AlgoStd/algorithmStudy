function solution(cap, n, deliveries, pickups) {
  var answer = 0;

  let dRemain = 0;
  let pRemain = 0;

  let cnt = 0;

  for (let i = n - 1; i >= 0; i--) {
    dRemain += deliveries[i];
    pRemain += pickups[i];

    while (dRemain > 0 || pRemain > 0) {
      cnt++;
      dRemain -= cap;
      pRemain -= cap;
    }

    answer += (i + 1) * cnt * 2;

    cnt = 0;
  }

  return answer;
}
