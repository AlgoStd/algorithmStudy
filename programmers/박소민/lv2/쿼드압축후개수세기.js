function solution(arr) {
  const answer = [0, 0];

  const compress = (r, c, size) => {
    const first = arr[r][c];

    for (let i = r; i < r + size; i++) {
      for (let j = c; j < c + size; j++) {
        if (arr[i][j] !== first) {
          const half = size / 2;
          compress(r, c, half);
          compress(r, c + half, half);
          compress(r + half, c, half);
          compress(r + half, c + half, half);
          return;
        }
      }
    }

    answer[first]++;
  };

  compress(0, 0, arr.length);

  return answer;
}
