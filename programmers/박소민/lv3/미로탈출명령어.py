# 복잡한 시뮬레이션

def solution(n, m, x, y, r, c, k):
    answer = []
    
    # 1. 일단 갈 수 있는지 확인
    minD = abs(r - x) + abs(c - y)
    
    # 1) 맨해튼 거리 > k
    if minD > k:
        return "impossible"
    
    # 2) 왕복할 수 없는 경우 (맨해튼 거리) % 2 != k % 2
    if minD % 2 != k % 2:
        return "impossible"
    
    # 방향 전환을 위한 변수 선언
    direction = ['d', 'l', 'r', 'u']
    dr = [1, 0, 0, -1]
    dc = [0, -1, 1, 0]
    
    # 남은 카운트 저장을 위한 변수 생성
    cnt = k
    
    # 출발지점, 목표지점 0-index로 변환
    cr = x - 1
    cc = y - 1
    
    r_end = r - 1
    c_end = c - 1
    
    while cnt > 0:
        is_possible = False
        
        for i in range(4):
            nr = cr + dr[i]
            nc = cc + dc[i]
            
            # 경계인 경우 continue
            if nr < 0 or nr >= n or nc < 0 or nc >= m:
                continue
            # 다음 위치 맨해튼 거리 <= 남은 왕복 횟수 - 1
            if abs(r_end - nr) + abs(c_end - nc) <= cnt - 1:
                cr = nr
                cc = nc
                answer.append(direction[i])
                
                is_possible = True
                break
        
        if not is_possible:
            return "impossible"
        cnt -= 1
    
    return "".join(answer)