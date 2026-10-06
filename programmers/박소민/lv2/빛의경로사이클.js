/*
이게 왜 시뮬레이션일까?
처음에는 dfs/bfs인 줄 알았다.
그러니 아는 트리구조가 아니므로 이렇게 할 필요가 없다.
의미상으로만 봐도 깊이 우선 탐색, 너비 우선 탐색을 하지 않아도 된다.
단순히 '현재 위치에서 같은 방향으로 간 적이 있는가'만 판단하면 된다.

-> 따라서 단순 시뮬레이션이다.
*/

function solution(grid) {
  const h = grid.length;
  const w = grid[0].length;
  var answer = [];

  // [수정] 기존의 Set을 사용하면 안 좋은 경우 공간 복잡도 O(n^2)이다.
  // 공간 복잡도를 위해 h, w, dir 3차원으로 배열 생성
  const visited = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => Array(4).fill(false)),
  );

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

        if (visited[r][c][dir]) continue;

        while (!visited[r][c][dir]) {
          visited[r][c][dir] = true;
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

          cnt++;
        }

        answer.push(cnt);
      }
    }
  }

  return answer.sort((a, b) => a - b);
}
