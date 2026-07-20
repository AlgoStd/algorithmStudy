// 최고, 최저 순위
/*
알아볼 수 없는 번호 0;
*/

const level = { 6: 1, 5: 2, 4: 3, 3: 4, 2: 5, 1: 6, 0: 6 };

function solution(lottos, win_nums) {
  const winSet = new Set();

  for (const num of win_nums) {
    winSet.add(num);
  }

  let sameCnt = 0;
  let zeroCnt = 0;

  for (const num of lottos) {
    if (num === 0) zeroCnt++;
    else if (winSet.has(num)) sameCnt++;
  }

  return [level[String(sameCnt + zeroCnt)], level[String(sameCnt)]];
}
