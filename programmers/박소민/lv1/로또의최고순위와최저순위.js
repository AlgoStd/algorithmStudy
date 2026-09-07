function solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];

  // 6개의 배열이 아닌 배열의 길이가 매우 크다면 -> Set
  const winSet = new Set(win_nums);

  let zeroCnt = 0;
  let matchCnt = 0;

  for (const num of lottos) {
    if (num === 0) {
      zeroCnt++;
    } else if (winSet.has(num)) {
      matchCnt++;
    }
  }

  return [rank[matchCnt + zeroCnt], rank[matchCnt]];
}
