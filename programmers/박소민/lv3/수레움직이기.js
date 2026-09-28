// 방법 2 : bfs + 비트마스킹

function solution(maze) {
  const n = maze.length;
  const m = maze[0].length;

  const queue = [];
  let head = 0;

  let rStart;
  let bStart;
  let rEnd;
  let bEnd;

  let rStartMask = 0;
  let bStartMask = 0;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      const idx = r * m + c;

      if (maze[r][c] === 5) {
        rStartMask |= 1 << idx;
        bStartMask |= 1 << idx;
      }

      if (maze[r][c] === 1) rStart = [r, c];
      else if (maze[r][c] === 2) bStart = [r, c];
      else if (maze[r][c] === 3) rEnd = [r, c];
      else if (maze[r][c] === 4) bEnd = [r, c];
    }
  }

  rStartMask |= 1 << (rStart[0] * m + rStart[1]);
  bStartMask |= 1 << (bStart[0] * m + bStart[1]);

  queue.push([rStart, bStart, rStartMask, bStartMask, 0]);

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];

  while (head < queue.length) {
    const [rPos, bPos, rMask, bMask, cnt] = queue[head++];

    const rArrived = rPos[0] === rEnd[0] && rPos[1] === rEnd[1] ? true : false;
    const bArrived = bPos[0] === bEnd[0] && bPos[1] === bEnd[1] ? true : false;

    if (rArrived && bArrived) return cnt;

    // 1. 파란색만 이동
    if (rArrived) {
      for (let i = 0; i < 4; i++) {
        const nr = bPos[0] + dr[i];
        const nc = bPos[1] + dc[i];

        if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;

        const ni = nr * m + nc;

        if ((bMask & (1 << ni)) !== 0) continue;

        if (nr === rPos[0] && nc === rPos[1]) continue;

        const nextMask = bMask | (1 << ni);
        queue.push([rPos, [nr, nc], rMask, nextMask, cnt + 1]);
      }
    }

    // 2. 빨간색만 이동
    else if (bArrived) {
      for (let i = 0; i < 4; i++) {
        const nr = rPos[0] + dr[i];
        const nc = rPos[1] + dc[i];

        if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;

        const ni = nr * m + nc;

        if ((rMask & (1 << ni)) !== 0) continue;

        if (nr === bPos[0] && nc === bPos[1]) continue;

        const nextMask = rMask | (1 << ni);
        queue.push([[nr, nc], bPos, nextMask, bMask, cnt + 1]);
      }
    }

    // 3. 둘 다 이동
    else {
      for (let i = 0; i < 4; i++) {
        const rnr = rPos[0] + dr[i];
        const rnc = rPos[1] + dc[i];

        if (rnr < 0 || rnr >= n || rnc < 0 || rnc >= m) continue;

        const rni = rnr * m + rnc;

        if ((rMask & (1 << rni)) !== 0) continue;

        const nextRMask = rMask | (1 << rni);

        for (let j = 0; j < 4; j++) {
          const bnr = bPos[0] + dr[j];
          const bnc = bPos[1] + dc[j];

          if (bnr < 0 || bnr >= n || bnc < 0 || bnc >= m) continue;

          const bni = bnr * m + bnc;

          if ((bMask & (1 << bni)) !== 0) continue;

          const nextBMask = bMask | (1 << bni);

          // 교차하는 경우
          if (
            bnr === rPos[0] &&
            bnc === rPos[1] &&
            rnr === bPos[0] &&
            rnc === bPos[1]
          )
            continue;
          // 같은 곳으로 가는 경우
          if (bnr === rnr && bnc === rnc) continue;

          queue.push([[rnr, rnc], [bnr, bnc], nextRMask, nextBMask, cnt + 1]);
        }
      }
    }
  }

  return 0;
}
