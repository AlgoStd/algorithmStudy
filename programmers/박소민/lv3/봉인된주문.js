// 알파벳 총 숫자 26개.
function solution(n, bans) {
  let bn = BigInt(n);

  const returnIdx = (str) => {
    // 1-index (26진법이므로)
    return BigInt(str.charCodeAt() - 96);
  };

  // [수정] forEach로 하는 경우 반환 값이 없으므로 변수할당 X
  bans
    .map((ban) => {
      let num = 0n;

      const size = ban.length;

      // 26진수로 갱신
      for (let i = size - 1; i >= 0; i--) {
        num += returnIdx(ban[i]) * 26n ** BigInt(size - 1 - i);
      }

      return num;
    })
    .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
    .forEach((v) => v <= bn && bn++);

  // [수정] 문자열로 수정 - 최대 20글자이므로 Array 오버헤드보다 가볍다
  let answer = "";

  while (bn > 0) {
    // 0-index 변환을 위한 1 빼기
    bn--;

    const val = Number(bn % 26n);
    answer = String.fromCharCode(97 + val) + answer;
    bn /= 26n;
  }

  return answer;
}
