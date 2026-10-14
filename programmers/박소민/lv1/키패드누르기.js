/*
상태 : 왼손가락, 오른손가락
맨해튼 거리 파악
*/

function solution(numbers, hand) {
  var answer = [];

  const dist = ([r1, c1], [r2, c2]) => {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2);
  };

  let left = [3, 0];
  let right = [3, 2];

  for (const number of numbers) {
    // 0-index로 변환
    const num = number - 1;

    const curr = num !== -1 ? [Math.floor(num / 3), num % 3] : [3, 1];

    if (num === -1 || num % 3 === 1) {
      const leftD = dist(left, curr);
      const rightD = dist(right, curr);

      if (leftD > rightD) {
        answer.push("R");
        right[0] = curr[0];
        right[1] = curr[1];
      } else if (leftD < rightD) {
        answer.push("L");
        left[0] = curr[0];
        left[1] = curr[1];
      } else {
        if (hand === "right") {
          answer.push("R");
          right[0] = curr[0];
          right[1] = curr[1];
        } else {
          answer.push("L");
          left[0] = curr[0];
          left[1] = curr[1];
        }
      }
    } else if (num % 3 === 0) {
      answer.push("L");
      left[0] = curr[0];
      left[1] = curr[1];
    } else {
      answer.push("R");
      right[0] = curr[0];
      right[1] = curr[1];
    }
  }

  return answer.join("");
}
