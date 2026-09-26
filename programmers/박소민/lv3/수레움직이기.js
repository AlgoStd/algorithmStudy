function solution(maze) {
  const n = maze.length;
  const m = maze[0].length;

  const rVisited = Array.from({ length: n }, () => Array(m).fill(false));
  const bVisited = Array.from({ length: n }, () => Array(m).fill(false));

  let rStart;
  let bStart;

  let rEnd;
  let bEnd;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (maze[r][c] === 1) {
        rStart = [r, c];
      } else if (maze[r][c] === 2) {
        bStart = [r, c];
      } else if (maze[r][c] === 3) {
        rEnd = [r, c];
      } else if (maze[r][c] === 4) {
        bEnd = [r, c];
      }
    }
  }

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];

  let minCnt = Infinity;

  const dfs = (rp, bp, cnt) => {
    if (cnt >= minCnt) return;

    const rArrived = rp[0] === rEnd[0] && rp[1] === rEnd[1] ? true : false;
    const bArrived = bp[0] === bEnd[0] && bp[1] === bEnd[1] ? true : false;

    if (rArrived && bArrived) {
      minCnt = Math.min(minCnt, cnt);
      return;
    }

    // 1. 빨간색이 이미 도착
    else if (rArrived) {
      for (let i = 0; i < 4; i++) {
        const nbr = bp[0] + dr[i];
        const nbc = bp[1] + dc[i];

        if (
          nbr >= 0 &&
          nbr < n &&
          nbc >= 0 &&
          nbc < m &&
          maze[nbr][nbc] !== 5 &&
          !bVisited[nbr][nbc] &&
          (nbr !== rp[0] || nbc !== rp[1])
        ) {
          bVisited[nbr][nbc] = true;
          dfs(rp, [nbr, nbc], cnt + 1);
          bVisited[nbr][nbc] = false;
        }
      }
    }

    // 2. 파란색이 이미 도착
    else if (bArrived) {
      for (let i = 0; i < 4; i++) {
        const nrr = rp[0] + dr[i];
        const nrc = rp[1] + dc[i];

        if (
          nrr >= 0 &&
          nrr < n &&
          nrc >= 0 &&
          nrc < m &&
          maze[nrr][nrc] !== 5 &&
          !rVisited[nrr][nrc] &&
          (nrr !== bp[0] || nrc !== bp[1])
        ) {
          rVisited[nrr][nrc] = true;
          dfs([nrr, nrc], bp, cnt + 1);
          rVisited[nrr][nrc] = false;
        }
      }
    }

    // 3. 둘 다 도착하지 않은 경우
    else {
      for (let i = 0; i < 4; i++) {
        const nrr = rp[0] + dr[i];
        const nrc = rp[1] + dc[i];

        if (nrr < 0 || nrr >= n || nrc < 0 || nrc >= m) continue;
        if (rVisited[nrr][nrc]) continue;
        if (maze[nrr][nrc] === 5) continue;

        for (let j = 0; j < 4; j++) {
          const nbr = bp[0] + dr[j];
          const nbc = bp[1] + dc[j];

          if (nbr < 0 || nbr >= n || nbc < 0 || nbc >= m) continue;
          if (bVisited[nbr][nbc]) continue;
          if (maze[nbr][nbc] === 5) continue;

          // 가려고 하는 곳이 같은 경우
          if (nbr === nrr && nbc === nrc) continue;
          // 서로 교차하는 경우 (수레끼리 자리를 바꾸며?)
          if (nbr === rp[0] && nbc === rp[1] && nrr === bp[0] && nrc === bp[1])
            continue;

          rVisited[nrr][nrc] = true;
          bVisited[nbr][nbc] = true;
          dfs([nrr, nrc], [nbr, nbc], cnt + 1);
          rVisited[nrr][nrc] = false;
          bVisited[nbr][nbc] = false;
        }
      }
    }
  };

  rVisited[rStart[0]][rStart[1]] = true;
  bVisited[bStart[0]][bStart[1]] = true;
  dfs(rStart, bStart, 0);

  return minCnt === Infinity ? 0 : minCnt;
}
