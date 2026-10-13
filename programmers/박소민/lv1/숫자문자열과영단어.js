const engToNum = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function solution(s) {
  let answer = s;
  for (const [k, v] of Object.entries(engToNum)) {
    answer = answer.replaceAll(k, v);
  }
  return Number(answer);
}
