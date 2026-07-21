function solution(arr) {
  const n = arr.length;

  let totalOne = 0;
  let totalZero = 0;

  const dfs = (d, val, cr, cc) => {
    if (d === 1) {
      if (arr[cr][cc] === 1) {
        totalOne++;
      } else {
        totalZero++;
      }
      return;
    }

    let allSame = true;

    for (let r = cr; r < cr + d; ++r) {
      for (let c = cc; c < cc + d; ++c) {
        // 처음만 들어가도록!
        if (val !== arr[r][c]) {
          allSame = false;
          const nd = Math.floor(d / 2);
          dfs(nd, val, cr, cc);
          dfs(nd, arr[cr + nd][cc], cr + nd, cc);
          dfs(nd, arr[cr][cc + nd], cr, cc + nd);
          dfs(nd, arr[cr + nd][cc + nd], cr + nd, cc + nd);
          return;
        }
      }
    }

    if (allSame) {
      if (val === 1) {
        totalOne++;
      } else {
        totalZero++;
      }

      return;
    }
  };

  dfs(n, arr[0][0], 0, 0);

  return [totalZero, totalOne];
}
