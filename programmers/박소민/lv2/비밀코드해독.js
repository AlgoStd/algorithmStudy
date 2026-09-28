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

  const qSets = q.map((val) => new Set(val));

  const dfs = (num, len) => {
    if (len === 5) {
      for (let i = 0; i < m; i++) {
        let sameNum = 0;

        for (let j = 0; j < 5; j++) {
          if (qSets[i].has(passwords[j])) sameNum++;
        }

        if (sameNum !== ans[i]) return;
      }
      answer++;
      return;
    }

    for (let i = num; i <= n; i++) {
      passwords.push(i);
      dfs(i + 1, len + 1);
      passwords.pop();
    }
  };

  dfs(1, 0);

  return answer;
}
