/*
설계
1. 십진수를 이진수로 변환
2. 문자열 순회하면서 dfs 확인 -> 되면 넣고 아니면 return
*/

function solution(numbers) {
  var answer = [];

  for (const number of numbers) {
    let bNumber = number.toString(2);

    // (오답) 패딩 처리. 단순히 짝수뿐만이 아니라 2^h - 1 형태로 변환
    const h = Math.ceil(Math.log2(bNumber.length + 1));
    bNumber = bNumber.padStart(2 ** h - 1, "0");

    // 엣지케이스 길이가 1인 경우 true 표시 후 넘기기
    if (bNumber.length === 1) {
      answer.push(1);
      continue;
    }

    let isBTree = true;

    const dfs = (depth, idx) => {
      // early return
      if (!isBTree) return;

      // leaf 노드라면 return
      if (depth === 0) return;

      const curr = bNumber[idx];
      const lChildIdx = idx - 2 ** (depth - 1);
      const rChildIdx = idx + 2 ** (depth - 1);

      if (curr === "0") {
        if (bNumber[lChildIdx] === "1" || bNumber[rChildIdx] === "1") {
          isBTree = false;
          return;
        }
      }

      dfs(depth - 1, lChildIdx);
      dfs(depth - 1, rChildIdx);
    };

    const startIdx = Math.floor(bNumber.length / 2);
    const maxDepth = Math.log2(startIdx + 1);

    dfs(maxDepth, startIdx);

    answer.push(isBTree ? 1 : 0);
  }

  return answer;
}
