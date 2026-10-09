# 설계 단순 시뮬레이션 문제

def solution(grid):
    n = len(grid)
    m = len(grid[0])
    answer = []
    
    # 1. 3차원 (r, c, 방향) 배열 선언
    visited = [[[False for _ in range(4)] for _ in range(m)] for _ in range(n)]
    
    # 2. 회전을 위한 dr, dc 생성
    dr = [-1, 0, 1, 0]
    dc = [0, 1, 0, -1]
    
    # 3. 전체의 경우의 수 돌리기 (visited로 사이클이 생기면 종료)
    for r in range(n):
        for c in range(m):
            for i in range(4):
                if visited[r][c][i]:
                    continue
                
                cr = r
                cc = c
                cd = i

                cnt = 0

                while not visited[cr][cc][cd]:
                    # 1. 현재 위치 + 방향 방문 표시
                    visited[cr][cc][cd] = True
                    
                    # 2. 방향 확인
                    direction = grid[cr][cc]

                    # 반시계 방향
                    if direction == 'L':
                        cd = (cd + 3) % 4
                    # 시계방향
                    elif direction == 'R':
                        cd = (cd + 1) % 4
                    # 직진 (생략: 같다)

                    # 위치 이동
                    cr = (cr + dr[cd]) % n
                    cc = (cc + dc[cd]) % m

                    # 사이클 카운트 1 증가
                    cnt += 1

                answer.append(cnt)
    answer.sort()
    
    return answer