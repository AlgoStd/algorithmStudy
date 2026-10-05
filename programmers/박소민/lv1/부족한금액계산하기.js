// 수학적 계산 -> 등차수열
function solution(price, money, count) {
  const cost = (price * count * (count + 1)) / 2;

  return cost > money ? cost - money : 0;
}
