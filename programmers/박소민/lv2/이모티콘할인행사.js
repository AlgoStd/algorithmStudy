/*
설계: 완전탐색의 냄새
7 * 4 * 100
dfs + 백트래킹
*/

function solution(users, emoticons) {
  const n = users.length;
  const m = emoticons.length;
  let answer = [0, 0];

  // 할인율
  const sales = Array(m).fill(0);

  // 이모티콘 할인율 정하기
  const dfs = (idx) => {
    if (idx === m) {
      const total = [0, 0];

      // users 순회하면서 구하기
      for (const [percent, budget] of users) {
        let buying = 0;

        for (let i = 0; i < m; i++) {
          const price = emoticons[i];
          const sale = sales[i];

          // 사용자가 원하는 할인율보다 높다면 구매
          if (sale >= percent) {
            buying += (price * (100 - sale)) / 100;
          }

          // 이모티콘 구매 비용이 예산 보다 높다면
          // 모두 취소 후 서비스 가입
          if (buying >= budget) {
            buying = 0;
            total[0]++;
            break;
          }
        }

        if (buying > 0 && buying < budget) {
          total[1] += buying;
        }
      }

      // [수정] 참조 할당 혹시 모르니 얕은 복사
      if (total[0] > answer[0]) {
        answer[0] = total[0];
        answer[1] = total[1];
      } else if (total[0] === answer[0]) {
        answer[1] = Math.max(answer[1], total[1]);
      }

      return;
    }

    for (const sale of [10, 20, 30, 40]) {
      sales[idx] = sale;
      dfs(idx + 1);
      // 어차피 덮어씌워지므로 백트래킹 제외
    }
  };

  dfs(0);

  return answer;
}
