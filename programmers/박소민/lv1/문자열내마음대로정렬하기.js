function solution(strings, n) {
  // 문자열은 빼기 연산시 NaN을 반환한다!
  answer = strings.sort((a, b) => {
    if (a[n] !== b[n]) {
      return a[n] > b[n] ? 1 : -1;
    } else {
      return a > b ? 1 : -1;
    }
  });
  return answer;
}
