/*
설계
다해야 할 거 같은데 -> 반례 때문에 다 해야함

그냥 해볼게
*/

function solution(board) {
  let on = 0;
  let xn = 0;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === "O") on++;
      else if (board[r][c] === "X") xn++;
    }
  }

  // 1. 개수 규칙 위반
  if (on > xn + 1 || on < xn) return 0;

  // 엣지 케이스 : 둘 다 승리한 경우
  const isWin = (target) => {
    // 1. 가로 다 똑같아.
    for (let r = 0; r < 3; r++) {
      if (
        board[r][0] === target &&
        board[r][1] === target &&
        board[r][2] === target
      )
        return true;
    }

    // 2. 세로 다 똑같아.
    for (let c = 0; c < 3; c++) {
      if (
        board[0][c] === target &&
        board[1][c] === target &&
        board[2][c] === target
      )
        return true;
    }

    // 3. 대각선 똑같아.
    if (
      board[0][0] === target &&
      board[1][1] === target &&
      board[2][2] === target
    )
      return true;

    if (
      board[0][2] === target &&
      board[1][1] === target &&
      board[2][0] === target
    )
      return true;

    return false;
  };

  const oWin = isWin("O");
  const xWin = isWin("X");

  if (oWin && xWin) return 0;
  if (oWin && on !== xn + 1) return 0;
  if (xWin && on !== xn) return 0;

  return 1;
}
