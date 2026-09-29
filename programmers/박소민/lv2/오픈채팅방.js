function solution(record) {
  var answer = [];
  const uids = new Map();

  for (const str of record) {
    const arr = str.split(" ");

    if (arr[0] === "Enter") {
      uids.set(arr[1], arr[2]);
      answer.push([arr[1], "님이 들어왔습니다."]);
    } else if (arr[0] === "Leave") {
      answer.push([arr[1], "님이 나갔습니다."]);
    } else if (arr[0] === "Change") {
      uids.set(arr[1], arr[2]);
    }
  }

  for (let i = 0; i < answer.length; i++) {
    answer[i][0] = uids.get(answer[i][0]);
    answer[i] = answer[i].join("");
  }

  return answer;
}
