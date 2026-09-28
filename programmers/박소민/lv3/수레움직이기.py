# bfs + 비트마스킹
# 참고 ) 방법 1 : dfs + 백트래킹

from collections import deque

def solution(maze):
    n = len(maze)
    m = len(maze[0])
    
    r_mask = 0
    b_mask = 0
    
    for r in range(n):
        for c in range(m):
            if maze[r][c] == 5:
                r_mask |= (1 << (r * m + c))
                b_mask |= (1 << (r * m + c))
            elif maze[r][c] == 1:
                r_start = [r, c]
            elif maze[r][c] == 2:
                b_start = [r, c]
            elif maze[r][c] == 3:
                r_end = [r, c]
            elif maze[r][c] == 4:
                b_end = [r, c]
    
    r_mask |= (1 << (r_start[0] * m + r_start[1]))
    b_mask |= (1 << (b_start[0] * m + b_start[1]))
    
    queue = deque()
    queue.append([r_start, b_start, r_mask, b_mask, 0])
    
    dr = [0, 0, 1, -1]
    dc = [1, -1, 0, 0]
    
    def can_go(r, c):
        if r < 0 or r >= n or c < 0 or c >= m:
            return True
        if maze[r][c] == 5:
            return True
        return False
    
    while (queue):
        [r_pos, b_pos, r_mask, b_mask, cnt] = queue.popleft()
        
        r_arrived = True if r_pos[0] == r_end[0] and r_pos[1] == r_end[1] else False
        b_arrived = True if b_pos[0] == b_end[0] and b_pos[1] == b_end[1] else False
        
        if r_arrived and b_arrived:
            return cnt
        
        # 파란색만 움직이는 경우
        elif r_arrived:
            for i in range(4):
                nr = b_pos[0] + dr[i]
                nc = b_pos[1] + dc[i]
                
                if can_go(nr, nc):
                    continue
                
                ni = nr * m + nc
                
                if (b_mask & (1 << ni)) != 0:
                    continue
                if nr == r_pos[0] and nc == r_pos[1]:
                    continue
                    
                nb_mask = b_mask | (1 << ni)
                
                queue.append([r_pos, [nr, nc], r_mask, nb_mask, cnt + 1])
        
        # 빨간색만 움직이는 경우
        elif b_arrived:
            for i in range(4):
                nr = r_pos[0] + dr[i]
                nc = r_pos[1] + dc[i]
                
                if can_go(nr, nc):
                    continue
                    
                ni = nr * m + nc
                
                if (r_mask & (1 << ni)) != 0:
                    continue
                if nr == b_pos[0] and nc == b_pos[1]:
                    continue
                    
                nr_mask = r_mask | (1 << ni)
                
                queue.append([[nr, nc], b_pos, nr_mask, b_mask, cnt + 1])
        
        # 둘 다 아닌 경우
        else:
            for i in range(4):
                rnr = r_pos[0] + dr[i]
                rnc = r_pos[1] + dc[i]
                
                if can_go(rnr, rnc):
                    continue
                
                rni = rnr * m + rnc
                
                if (r_mask & (1 << rni)) != 0:
                    continue
                
                for j in range(4):
                    bnr = b_pos[0] + dr[j]
                    bnc = b_pos[1] + dc[j]
                    
                    if can_go(bnr, bnc):
                        continue
                        
                    bni = bnr * m + bnc
                
                    if (b_mask & (1 << bni)) != 0:
                        continue
                        
                    if rnr == bnr and rnc == bnc:
                        continue
                    if rnr == b_pos[0] and rnc == b_pos[1] and bnr == r_pos[0] and bnc == r_pos[1]:
                        continue
                        
                    nr_mask = r_mask | (1 << rni)
                    nb_mask = b_mask | (1 << bni)
                    
                    queue.append([[rnr, rnc], [bnr, bnc], nr_mask, nb_mask, cnt + 1])
    
    return 0