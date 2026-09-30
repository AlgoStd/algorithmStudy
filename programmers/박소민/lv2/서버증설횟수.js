function solution(players, m, k) {
  var answer = 0;
  let servers = 0;

  // 시간이 24이므로 24길이의 배열 선언 후 만료되는 서버 기록
  const expired = Array(24).fill(0);

  for (let i = 0; i < 24; i++) {
    const player = players[i];

    // 만료되는 서버 제거
    servers -= expired[i];

    // 현재 증설이 필요한 서버의 수
    const needs = Math.floor(player / m) - servers;

    // 증설이 필요하지 않다면 continue
    if (needs <= 0) continue;

    // 만료되는 시간 기록
    // 주의 -> 인덱스 초과 오류 if 문으로 제어
    if (i + k < 24) {
      expired[i + k] += needs;
    }

    // 서버 증설
    servers += needs;
    answer += needs;
  }

  return answer;
}
