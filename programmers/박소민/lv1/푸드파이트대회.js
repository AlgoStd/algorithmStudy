function solution(food) {
  let left = "";

  for (let i = 0; i < food.length; i++) {
    const val = food[i];
    left += String(i).repeat(Math.floor(val / 2));
  }

  return left + "0" + [...left].reverse().join("");
}
