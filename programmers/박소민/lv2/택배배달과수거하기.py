# 1. 그리디 알고리즘
#     - 매 순간 최선의 선택이 전체 최선의 선택이 되므로
# 2. 뒤에서부터 앞으로 이동
#     - 앞에서부터 뒤로 가는 경우 좀 더 복잡해진다. → 배달/수거 두 가지의 경우를 고려하기가 좀 더 복잡해짐 (왔다갔다 할 수 있게 됨 → 시간복잡도 증가.)
# 3. 트럭이 기준이 아니라 “누적 할당량”을 기준으로 함
#     - 트럭이 기준이 되어버린다면 왔다갔다 해야 하기 때문에 시간초과가 일어날 수 있음
#         - idx로 하면 되지만 그렇다면 while문을 여러 번 사용해야 하기 때문에 코드 길이가 길어짐
# 4. 배열을 뒤에서부터 순회
#     1. d_remain, p_remain 갱신 (현재 인덱스의 값만큼)
#     2. 둘 중 하나라도 양수라면 (왕복) - while문
#     참고) 순서 상관 없지만 일단 트럭을 출발시킨다는 점에서 cnt += 1을 먼저 한다.
#         1. cnt += 1
#         2. 둘 다 cap만큼 빼기
#     3. 거리(현재 인덱스) * 2 * cnt 만큼 갱신
#     4. cnt = 0
# 5. 거리 반환

def solution(cap, n, deliveries, pickups):
    answer = 0
    
    d_remain = 0
    p_remain = 0
    
    cnt = 0
    
    for i in range(n-1, -1, -1):
        d_remain += deliveries[i]
        p_remain += pickups[i]
        
        # while문 둘 다 모두 비워야 하므로
        while d_remain > 0 or p_remain > 0:
            cnt += 1
            d_remain -= cap
            p_remain -= cap
        
        # 0-index -> 1-index로 변환
        answer += (i + 1) * cnt * 2
        
        cnt = 0
    
    return answer