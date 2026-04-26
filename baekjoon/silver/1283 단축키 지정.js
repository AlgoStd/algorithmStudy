// 1283 단축키

/* 설계
문자열 + 안된다. (힙메모리를 많이 만드므로 gc가 바빠져 블로킹이 생길 수 있다.)
*/

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .replaceAll("\r", "") // just in case
  .trim()
  .split("\n");

/**
 *
 * @param {string[]} input
 * @returns {string}
 */
function solution(input) {
  const N = Number(input[0]);
  const options = [];
  const shortCutKeys = [];

  for (let line = 1; line <= N; line++) {
    // 1. 주어진 문자열을 배열로 만든다.
    const arr = input[line].split("");
    let shortCutKeyIdx = -1;

    // 2. 각 단어의 첫번째 char가 단축키에 지정되어 있는지 확인
    for (let i = 0; i < arr.length; i++) {
      if (i !== 0 && arr[i - 1] !== " ") continue;

      if (
        shortCutKeys.includes(arr[i].toLowerCase()) ||
        shortCutKeys.includes(arr[i].toUpperCase())
      )
        continue;

      shortCutKeys.push(arr[i]); // 단축키를 저장합니다.
      shortCutKeyIdx = i;
      break;
    }

    // 3. 모든 단어의 첫 글자가 이미 지정이 된 경우 단축키로 지정 안된 것을 지정.
    if (shortCutKeyIdx === -1) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === " ") continue;

        if (
          shortCutKeys.includes(arr[i].toLowerCase()) ||
          shortCutKeys.includes(arr[i].toUpperCase())
        )
          continue;

        shortCutKeys.push(arr[i]);
        shortCutKeyIdx = i;
        break;
      }
    }

    // 단축키가 있는 경우 [] 추가
    if (shortCutKeyIdx !== -1) {
      const result = arr.reduce(
        (acc, val, i) => (i === shortCutKeyIdx ? acc + `[${val}]` : acc + val),
        "",
      );

      options.push(result);
    } else {
      options.push(input[line]);
    }
  }

  return options.join("\n");
}

const result = solution(input);
console.log(result);
