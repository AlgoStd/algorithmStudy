/*
서로 다른 정수 5개가 오름차순

m번의 시도 -> 서로 다른 5개의 정수를 입력 -> 몇 개가 비밀 코드에 포함되어 있는지

비밀 코드로 가능한 정수 조합의 개수

완전탐색 dfs + 백트래킹
*/

function solution(n, q, ans) {
  const m = q.length;

  var answer = 0;

  const passwords = [];
  const visited = Array(n + 1).fill(false); // 1-index

  const is_valid = () => {
    for (let i = 0; i < m; i++) {
      let sameNum = 0;
      const query = q[i];

      for (const val of query) {
        if (passwords.includes(val)) sameNum++;
      }

      if (sameNum !== ans[i]) return false;
    }

    return true;
  };

  const dfs = (num, len) => {
    if (len === 5) {
      if (is_valid()) answer++;
      return;
    }

    for (let i = num; i <= n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        passwords.push(i);
        dfs(i + 1, len + 1);
        visited[i] = false;
        passwords.pop();
      }
    }
  };

  dfs(1, 0);

  return answer;
}
