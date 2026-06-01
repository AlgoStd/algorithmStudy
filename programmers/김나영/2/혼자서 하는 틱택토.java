class Solution {
    
    public boolean isWin(String[] board, char c) {
        // 가로
        for (int i = 0; i < 3; i++) {
            if (board[i].charAt(0) == c && board[i].charAt(1) == c && board[i].charAt(2) == c) return true;
        }
        // 세로
        for (int j = 0; j < 3; j++) {
            if (board[0].charAt(j) == c && board[1].charAt(j) == c && board[2].charAt(j) == c) return true;
        }
        // 대각선
        if (board[0].charAt(0) == c && board[1].charAt(1) == c && board[2].charAt(2) == c) return true;
        if (board[0].charAt(2) == c && board[1].charAt(1) == c && board[2].charAt(0) == c) return true;
        return false;
    }
    
    public int solution(String[] board) {
        int countO = 0;
        int countX = 0;

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i].charAt(j) == 'O') countO++;
                if (board[i].charAt(j) == 'X') countX++;
            }
        }
        
        boolean isWinO = isWin(board, 'O');
        boolean isWinX = isWin(board, 'X');
        
        if (countX > countO) return 0;
        if (countO > countX + 1) return 0;
        if (isWinO && isWinX) return 0;
        if (isWinO && (countO <= countX)) return 0;
        if (isWinX && (countX < countO)) return 0;
        
        return 1;
    }
}