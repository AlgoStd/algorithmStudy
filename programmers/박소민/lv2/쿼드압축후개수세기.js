function solution(arr) {
  const n = arr.length;

  let totalOne = 0;
  let totalZero = 0;

  const dfs = (d, cr, cc) => {
    const val = arr[cr][cc];

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
          dfs(nd, cr, cc);
          dfs(nd, cr + nd, cc);
          dfs(nd, cr, cc + nd);
          dfs(nd, cr + nd, cc + nd);
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

  dfs(n, 0, 0);

  return [totalZero, totalOne];
}
