const words = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function solution(s) {
  let answer = s;
  for (let i = 0; i < 10; i++) {
    answer = answer.replaceAll(words[i], i);
  }
  return Number(answer);
}
