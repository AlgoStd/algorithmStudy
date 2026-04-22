function solution(record) {
  var answer = [];
  const names = {};

  for (const str of record) {
    const arr = str.split(" ");
    const input = arr[0];
    const id = arr[1];

    if (arr.length === 2) {
      continue;
    }

    const name = arr[2];
    names[id] = name;
  }

  for (const str of record) {
    const arr = str.split(" ");
    const input = arr[0];
    const id = arr[1];

    if (arr.length === 2) {
      answer.push(`${names[id]}님이 나갔습니다.`);
      continue;
    }

    if (input === "Enter") {
      answer.push(`${names[id]}님이 들어왔습니다.`);
    }
  }
  return answer;
}
