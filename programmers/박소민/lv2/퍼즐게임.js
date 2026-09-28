function solution(diffs, times, limit) {
  let answer = 0;
  const n = diffs.length;

  // 제한시간 안에 통과하는지 확인하는 함수
  const isPass = (level) => {
    let time = 0;

    for (let i = 0; i < n; i++) {
      const diff = diffs[i];
      const time_cur = times[i];
      const time_prev = i === 0 ? 0 : times[i - 1];

      if (diff <= level) {
        time += time_cur;
      } else {
        time += (diff - level) * (time_cur + time_prev) + time_cur;
      }

      if (time > limit) return false;
    }

    return time <= limit ? true : false;
  };

  // 선형으로 하면 n^2으로 시간복잡도 초과되므로 이진탐색(투 포인터)
  let start = 1;
  let end = 1000000;

  // start < end 아니면 start <= end 확인
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const result = isPass(mid);

    if (result) {
      answer = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return answer;
}
