# https://school.programmers.co.kr/learn/courses/30/lessons/250134
def solution(maze):
    answer = float('inf')
    n = len(maze)
    m = len(maze[0])
    red_visited = [[False] * m for _ in range(n)]
    blue_visited = [[False] * m for _ in range(n)]
    dy = [-1,1,0,0]
    dx = [0,0,-1,1]
    red_x, red_y, blue_x, blue_y = 0,0,0,0
    for i in range(n):
        for j in range(m):
            if maze[i][j] == 1:
                red_y = i
                red_x = j
            elif maze[i][j] == 2:
                blue_y = i
                blue_x = j
                
    # dfs 백트래킹 -> 모든 이동 경우 탐색
    def dfs(red_y, red_x, blue_y, blue_x, count):
        nonlocal answer
        
        if count >= answer:
            return
        
        # 둘 다 도착
        if maze[red_y][red_x] == 3 and maze[blue_y][blue_x] == 4:
            answer = min(answer, count)
            return
        
        for r_dir in range(4):
            if maze[red_y][red_x] == 3: # 이미 도착한 수레 처리
                nry, nrx = red_y, red_x
            else:
                nry = red_y + dy[r_dir]
                nrx = red_x + dx[r_dir]
            
            if nry < 0 or nry >= n or nrx < 0 or nrx >= m:
                continue
            if maze[nry][nrx] == 5:
                continue
            if maze[red_y][red_x] != 3 and red_visited[nry][nrx]:
                continue
                    
            for b_dir in range(4):
                if maze[blue_y][blue_x] == 4:
                    nby, nbx = blue_y, blue_x
                else:
                    nby = blue_y + dy[b_dir]
                    nbx = blue_x + dx[b_dir]
                
                if nby < 0 or nby >= n or nbx < 0 or nbx >= m:
                    continue
                if maze[nby][nbx] == 5:
                    continue
                if maze[blue_y][blue_x] != 4 and blue_visited[nby][nbx]:
                    continue
                    
                # 서로 같은 칸
                if nry == nby and nrx == nbx:
                    continue
                    
                # 서로 자리 바꾸기 금지
                if nry == blue_y and nrx == blue_x and nby == red_y and nbx == red_x:
                    continue
                    
                red_visited[nry][nrx] = True
                blue_visited[nby][nbx] = True
                
                dfs(nry, nrx, nby, nbx, count + 1)
                
                red_visited[nry][nrx] = False
                blue_visited[nby][nbx] = False
                    
    red_visited[red_y][red_x] = True
    blue_visited[blue_y][blue_x] = True
    
    dfs(red_y, red_x, blue_y, blue_x, 0)
    
    if answer == float('inf'):
        return 0
                
    return answer