# dfs + 백트래킹

def solution(maze):
    n = len(maze)
    m = len(maze[0])
    answer = 0
    
    for r in range(n):
        for c in range(m):
            if maze[r][c] == 1:
                r_start = [r, c]
            elif maze[r][c] == 2:
                b_start = [r, c]
            elif maze[r][c] == 3:
                r_end = [r, c]
            elif maze[r][c] == 4:
                b_end = [r, c]
    
    r_visited = [[False] * m for _ in range(n)]
    b_visited = [[False] * m for _ in range(n)]
    
    count = float('inf')
    
    dr = [0, 0, 1, -1]
    dc = [1, -1, 0, 0]
    
    def can_go(nr, nc):
        if nr < 0 or nr >= n or nc < 0 or nc >= m:
            return True
        if maze[nr][nc] == 5:
            return True
        return False
    
    def dfs(r_pos, b_pos, cnt):
        nonlocal count, r_visited, b_visited, dr, dc, r_end, b_end, r_start, b_start
        
        r_arrived = True if r_pos[0] == r_end[0] and r_pos[1] == r_end[1] else False
        b_arrived = True if b_pos[0] == b_end[0] and b_pos[1] == b_end[1] else False
        
        if r_arrived and b_arrived:
            count = min(count, cnt)
            return
        
        # 파란색만 움직이는 경우
        elif r_arrived:
            for i in range(4):
                nr = b_pos[0] + dr[i]
                nc = b_pos[1] + dc[i]
                
                if can_go(nr, nc):
                    continue
                if b_visited[nr][nc]:
                    continue
                if nr == r_pos[0] and nc == r_pos[1]:
                    continue
                
                b_visited[nr][nc] = True
                dfs(r_pos, [nr, nc], cnt + 1)
                b_visited[nr][nc] = False
        
        # 빨간색만 움직이는 경우
        elif b_arrived:
            for i in range(4):
                nr = r_pos[0] + dr[i]
                nc = r_pos[1] + dc[i]
                
                if can_go(nr, nc):
                    continue
                if r_visited[nr][nc]:
                    continue
                if nr == b_pos[0] and nc == b_pos[1]:
                    continue
                
                r_visited[nr][nc] = True
                dfs([nr, nc], b_pos, cnt + 1)
                r_visited[nr][nc] = False
        
        # 둘 다 아닌 경우
        else:
            for i in range(4):
                rnr = r_pos[0] + dr[i]
                rnc = r_pos[1] + dc[i]
                
                if can_go(rnr, rnc):
                    continue
                if r_visited[rnr][rnc]:
                    continue
                
                for j in range(4):
                    bnr = b_pos[0] + dr[j]
                    bnc = b_pos[1] + dc[j]
                    
                    if can_go(bnr, bnc):
                        continue
                    if b_visited[bnr][bnc]:
                        continue
                        
                    if rnr == bnr and rnc == bnc:
                        continue
                    if rnr == b_pos[0] and rnc == b_pos[1] and bnr == r_pos[0] and bnc == r_pos[1]:
                        continue
                    
                    r_visited[rnr][rnc] = True
                    b_visited[bnr][bnc] = True
                    dfs([rnr, rnc], [bnr, bnc], cnt + 1)
                    r_visited[rnr][rnc] = False
                    b_visited[bnr][bnc] = False
    
    r_visited[r_start[0]][r_start[1]] = True
    b_visited[b_start[0]][b_start[1]] = True
    dfs(r_start, b_start, 0)
    
    return 0 if count == float('inf') else count