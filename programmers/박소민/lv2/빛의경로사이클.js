function solution(grid) {
  const h = grid.length;
  const w = grid[0].length;
  var answer = [];

  const visited = new Set();

  const queue = [];
  let head = 0;
  queue.push([0, 0, 1, 0]);

  // 시계방향으로 선언
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      for (let d = 0; d < 4; d++) {
        let r = i;
        let c = j;
        let dir = d;
        let cnt = 0;

        let curr = `${r}|${c}|${dir}`;

        if (visited.has(curr)) continue;

        while (!visited.has(curr)) {
          visited.add(curr);
          const direction = grid[r][c];

          // 1. 좌회전
          if (direction === "L") {
            dir = (dir + 3) % 4;
          }
          // 2. 우회전
          else if (direction === "R") {
            dir = (dir + 1) % 4;
          }
          // 나머지 = 직진 (방향 이동 없음)

          // 다음 방향 계산
          r = (r + dr[dir] + h) % h;
          c = (c + dc[dir] + w) % w;

          curr = `${r}|${c}|${dir}`;
          cnt++;
        }

        answer.push(cnt);
      }
    }
  }

  return answer.sort((a, b) => a - b);
}
