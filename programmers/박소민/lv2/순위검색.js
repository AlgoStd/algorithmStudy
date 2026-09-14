/*
    const language = ['cpp', 'java', 'python', '-'];
    const job = ['backend', 'frontend', '-'];
    const degree = ['junior', 'senior', '-'];
    const food = ['chicken', 'pizza', '-'];
*/

function solution(info, query) {
  var answer = [];
  const people = new Map();

  for (const person of info) {
    const personInfo = person.split(" ");
    const score = Number(personInfo[4]);

    const keys = [];

    const current = [];

    const dfs = (idx) => {
      if (idx === 4) {
        keys.push(current.join("&&"));
        return;
      }

      for (const val of [personInfo[idx], "-"]) {
        current.push(val);
        dfs(idx + 1);
        current.pop();
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

  for (const [key, value] of people) {
    value.sort((a, b) => a - b);
  }

  for (const current of query) {
    const arr = current.split(" ");
    const str = `${arr[0]}&&${arr[2]}&&${arr[4]}&&${arr[6]}`;
    const targetScore = Number(arr[7]);

    const values = people.get(str);

    if (!values) {
      answer.push(0);
      continue;
    }

    let start = 0;
    let end = values.length;

    while (start < end) {
      const mid = Math.floor((start + end) / 2);

      if (targetScore > values[mid]) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }

    answer.push(values.length - start);
  }

  return answer;
}
