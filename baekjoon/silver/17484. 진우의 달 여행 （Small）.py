n,m = map(int, input().split())

cost= []
for _ in range(n):
    l = list(map(int, input().split()))
    cost.append(l)

INF = int(1e9)
dp = [[[INF]*3 for _ in range(m)] for _ in range(n)]

for x in range(m):
    for d in range(3):
        dp[0][x][d] = cost[0][x]

dx = [-1,0,1]
for y in range(n-1):
    for x in range(m):
        for k in range(3):
            if dp[y][x][k] == INF:
                continue
            for nk in range(3):
                if nk == k:
                    continue
                nx = x + dx[nk]
                ny = y + 1
                if 0 <= nx < m:
                    dp[ny][nx][nk] = min(dp[ny][nx][nk], dp[y][x][k] + cost[ny][nx])

ans = INF
for x in range(m):
    for d in range(3):
        ans = min(ans, dp[n - 1][x][d])

print(ans)
