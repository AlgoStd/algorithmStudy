function solution(info, query) {
  var answer = [];
  const people = new Map();

  for (const person of info) {
    const arr = person.split(" ");
    const score = Number(arr[4]);

    const keys = [];
    const temp = [];

    const dfs = (depth) => {
      if (depth === 4) {
        keys.push(temp.join("&&"));
        return;
      }

      for (const key of [arr[depth], "-"]) {
        temp.push(key);
        dfs(depth + 1);
        temp.pop();
      }
    };

    dfs(0);

    for (const key of keys) {
      if (people.has(key)) {
        people.get(key).push(score);
      } else {
        people.set(key, [score]);
      }
    }
  }

  // 이진 탐색을 위한 오름차순 정렬
  for (const scores of people.values()) {
    scores.sort((a, b) => a - b);
  }

  for (const qStr of query) {
    const qArr = qStr.split(" ");
    const key = `${qArr[0]}&&${qArr[2]}&&${qArr[4]}&&${qArr[6]}`;
    const targetScore = Number(qArr[7]); // 주의! 정수로 변환

    // 엣지케이스
    if (!people.has(key)) {
      answer.push(0);
      continue;
    }

    const scores = people.get(key);

    const len = scores.length;
    let start = 0;
    let end = len; // 오답 포인트

    while (start < end) {
      const mid = Math.floor((start + end) / 2);

      if (scores[mid] >= targetScore) {
        end = mid; // 오답 포인트
      } else {
        start = mid + 1;
      }
    }

    answer.push(len - start);
  }

  return answer;
}
