def solution(board, skill):
    n = len(board)
    m = len(board[0])
    
    prefixes = [[0] * (m+1) for _ in range(n+1)]
    
    for [sign, r1, c1, r2, c2, degree] in skill:
        attack = -degree if sign == 1 else degree
        
        prefixes[r2+1][c2+1] += attack
        prefixes[r2+1][c1] -= attack
        prefixes[r1][c2+1] -= attack
        prefixes[r1][c1] += attack
    
    for r in range(n+1):
        for c in range(1, m+1):
            prefixes[r][c] += prefixes[r][c-1]
            
    for r in range(1, n+1):
        for c in range(m+1):
            prefixes[r][c] += prefixes[r-1][c]
    
    answer = 0
    
    for r in range(n):
        for c in range(m):
            if prefixes[r][c] + board[r][c] > 0:
                answer += 1
    
    return answer