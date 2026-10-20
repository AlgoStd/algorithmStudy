/*
설계(3), 풀이(20)
가로 w
왕복으로 n개까지
꺼내야 하는 상자번호 num

몫과 나머지

0-index로 하고 마지막에 +1
상자 높이는 몫
몫이 0 혹은 짝수 -> 나머지, 순방향
몫이 홀수 -> 나머지, 역방향

오래 걸린 포인트 -> 가중치도 0-index라서 -1 해야 한다!
Math.floor 사용하기(잊어버렸다.)
*/

function solution(n, w, num) {
  var answer = 0;
  const zeroIdxNum = num - 1;

  const height = Math.floor(zeroIdxNum / w);
  const rest = height % 2 === 0 ? zeroIdxNum % w : w - 1 - (zeroIdxNum % w);

  // 해당 열의 총 높이 계산 = 마지막 층이 있냐 없냐.
  const maxHeight = Math.floor((n - 1) / w);
  let isOdd = maxHeight % 2 !== 0;
  const maxRest = isOdd ? w - 1 - ((n - 1) % w) : (n - 1) % w;

  // 꺼내야 하는 상자 계산 (마지막 층 제외)
  answer += maxHeight - height;

  // 역방향인 경우
  if (isOdd) {
    if (maxRest <= rest) answer++;
  } else {
    if (maxRest >= rest) answer++;
  }

  return answer;
}
