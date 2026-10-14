/*
상태 : 왼손가락, 오른손가락
맨해튼 거리 파악
curr와 left, right 배열의 길이가 모두 같다면
참조로 curr = left; curr = right 사용 가능
*/

const keypad = {
  1: [0, 0],
  2: [0, 1],
  3: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  7: [2, 0],
  8: [2, 1],
  9: [2, 2],
  "*": [3, 0],
  0: [3, 1],
  "#": [3, 2],
};

const dist = ([r1, c1], [r2, c2]) => {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};

function solution(numbers, hand) {
  var answer = [];

  let left = keypad["*"];
  let right = keypad["#"];

  for (const number of numbers) {
    const curr = keypad[number];

    if (number === 0 || number % 3 === 2) {
      const leftD = dist(left, curr);
      const rightD = dist(right, curr);

      if (leftD > rightD) {
        answer.push("R");
        right = curr;
      } else if (leftD < rightD) {
        answer.push("L");
        left = curr;
      } else {
        if (hand === "right") {
          answer.push("R");
          right = curr;
        } else {
          answer.push("L");
          left = curr;
        }
      }
    } else if (number % 3 === 1) {
      answer.push("L");
      left = curr;
    } else {
      answer.push("R");
      right = curr;
    }
  }

  return answer.join("");
}
