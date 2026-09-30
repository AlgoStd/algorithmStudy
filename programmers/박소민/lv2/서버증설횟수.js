/*
설계
시간복잡도 n^2 가능
그리디
*/

function solution(players, m, k) {
  // 총 증설 횟수
  var answer = 0;

  // 시간 관리를 위한 서버 배열
  const servers = [];
  let head = 0;
  // 현재 증설된 서버의 수를 나타내기 위한 변수
  let currServer = 0;

  for (const player of players) {
    for (let i = head; i < currServer + head; i++) {
      servers[i]--;
      if (servers[i] === 0) {
        head++;
        currServer--;
      }
    }

    while (player >= m + m * currServer) {
      answer++;
      currServer++;
      servers.push(k);
    }
  }

  return answer;
}
