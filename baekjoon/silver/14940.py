'''
0 : 갈 수 없는 땅
1 : 갈 수 있는 땅
2 : 목표지점

각 지점에서 목표지점까지의 거리 출력
원래 갈 수 없는 땅인 위치 = 0
원래 갈 수 있는 땅인 부분 중에서 도달할 수 없는 위치 = -1

접근 방법 : 목표 지점에서 bfs 한번 돌리기
'''
from collections import deque
n,m = map(int, input().split())

graph = [list(map(int, input().split())) for _ in range(n)]
INF = 2000
result = [[INF for _ in range(m)] for _ in range(n)]
goal_y, goal_x = 0,0
for i in range(n):
    for j in range(m):
        if graph[i][j] == 2:
            result[i][j] = 0
            goal_y, goal_x = i, j
        elif graph[i][j] == 0:
            result[i][j] = 0

dy = [-1,1,0,0]
dx = [0,0,-1,1]

queue = deque()
queue.append((goal_y, goal_x))

while queue:
    y,x = queue.popleft()
    for i in range(4):
        ny = y + dy[i]
        nx = x + dx[i]
        if 0 <= ny < n and 0 <= nx < m:
            if graph[ny][nx] == 1 and result[ny][nx] == INF:
                result[ny][nx] = result[y][x] + 1
                queue.append((ny,nx))

for i in range(n):
    for j in range(m):
        if result[i][j] == INF:
            print(-1, end=' ')
        else:
            print(result[i][j], end=' ')
    print()

