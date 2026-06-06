from collections import deque

def get_next_states(r, c, d, board):
    next_states = []

    # 1. 상, 하, 좌, 우 이동
    moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    for dr, dc in moves:
        nr, nc = r + dr, c + dc
        if d == 0: # 가로 상태: (nr, nc)와 (nr, nc+1) 칸 확인
            if board[nr][nc] == 0 and board[nr][nc+1] == 0:
                next_states.append((nr, nc, 0))
        else: # 세로 상태: (nr, nc)와 (nr+1, nc) 칸 확인
            if board[nr][nc] == 0 and board[nr+1][nc] == 0:
                next_states.append((nr, nc, 1))

    # 2. 회전 이동
    if d == 0: # 현재 가로
        for dr in [-1, 1]: # 위쪽(-1) 또는 아래쪽(1)으로 회전
            if board[r+dr][c] == 0 and board[r+dr][c+1] == 0:
                if dr == -1: 
                    # 위로 회전
                    next_states.append((r-1, c, 1))   # 왼쪽 칸(r,c)을 축
                    next_states.append((r-1, c+1, 1)) # 오른쪽 칸(r,c+1)을 축
                else: 
                    # 아래로 회전
                    next_states.append((r, c, 1))     # 왼쪽 칸 축
                    next_states.append((r, c+1, 1))   # 오른쪽 칸 축
                    
    else:
        for dc in [-1, 1]: # 왼쪽(-1) 또는 오른쪽(1)으로 회전
            # 회전할 때 걸치는 두 칸이 모두 0인지 확인
            if board[r][c+dc] == 0 and board[r+1][c+dc] == 0:
                if dc == -1: 
                    # 왼쪽으로 회전 -> 기준점(top-left)이 한 칸 왼쪽으로 이동
                    next_states.append((r, c-1, 0))   # 위쪽 칸(r,c)을 축
                    next_states.append((r+1, c-1, 0)) # 아래쪽 칸(r+1,c)을 축
                else: 
                    # 오른쪽으로 회전 -> 기준점 열(c)은 그대로 유지됨
                    next_states.append((r, c, 0))     # 위쪽 칸 축
                    next_states.append((r+1, c, 0))   # 아래쪽 칸 축

    return next_states

def solution(board):
    n = len(board)
    
    # 테두리에 1을 쳐서 인덱스 범위 초과 방지
    new_board = [[1] * (n + 2) for _ in range(n + 2)]
    for i in range(n):
        for j in range(n):
            new_board[i+1][j+1] = board[i][j]
            
    # [행][열]
    visited = [[False] * 2 for _ in range(n + 2)]
    
    # 큐에는 (r, c, d, cost)를 저장 
    # (1, 1) 위치, 가로 방향(0), 이동 횟수 0부터 시작
    queue = deque([(1, 1, 0, 0)]) 
    visited[1][1] = True
    
    while queue:
        r, c, d, cost = queue.popleft()
        
        # 도착
        if (r == n and c == n) or \
           (d == 0 and r == n and c + 1 == n) or \
           (d == 1 and r + 1 == n and c == n):
            return cost
            
        for nr, nc, nd in get_next_states(r, c, d, new_board):
            if not visited[nr][nc]:
                visited[nr][nc][nd] = True
                queue.append((nr, nc, nd, cost + 1))
                
    return 0