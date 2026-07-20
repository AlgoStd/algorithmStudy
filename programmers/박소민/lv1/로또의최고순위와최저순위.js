function solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];

  const zeroCnt = lottos.filter((num) => num === 0).length;

  const matchCnt = lottos.filter((num) => win_nums.includes(num)).length;

  return [rank[matchCnt + zeroCnt], rank[matchCnt]];
}
