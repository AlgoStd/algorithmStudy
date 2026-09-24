function solution(food) {
  var answer = "";
  const result = [];

  for (let i = 0; i < food.length; i++) {
    const num = Math.floor(food[i] / 2);

    for (let _ = 0; _ < num; _++) {
      result.push(i);
    }
  }

  const reverseResult = result.toReversed();

  return result.join("") + "0" + reverseResult.join("");
}
