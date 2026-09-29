def solution(board, h, w):
    n = len(board)
    m = len(board[0])
    answer = 0
    
    color = board[h][w]
    
    dr = [0, 0, 1, -1]
    dc = [1, -1, 0, 0]
    
    for i in range(4):
        nr = h + dr[i]
        nc = w + dc[i]
        
        if nr < 0 or nr >= n or nc < 0 or nc >= m:
            continue
        
        if board[nr][nc] == color:
            answer += 1
    
    return answer