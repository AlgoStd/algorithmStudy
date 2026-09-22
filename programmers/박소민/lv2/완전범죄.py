# 2번 방식 : 1차원 배열 + 바꿔치기 풀기

def solution(info, n, m):
    length = len(info)
    
    # 1. A의 최대값 n - 1 ~ 0까지 배열 선언
    dp = [float('inf')] * n
    
    # 2. 아무것도 넣지 않은 경우 0으로 초기화
    dp[0] = 0
    
    for i in range(1, length + 1):
        [a, b] = info[i-1]
        
        # 새로운 배열 선언
        next_dp = [float('inf')] * n
        
        for j in range(n):
            if dp[j] == float('inf'):
                continue
            
            prevB = dp[j]
            
            # A가 훔치는 경우 -> 이 부분이 이해가 안가 왜 prevB랑 비교해?
            if j + a < n:
                next_dp[j + a] = min(next_dp[j + a], prevB)
                
            # B가 훔치는 경우
            if prevB + b < m:
                next_dp[j] = min(next_dp[j], prevB + b)
        
        # 새로운 배열로 갱신
        dp = next_dp
    
    for j in range(n):
        if dp[j] < m:
            return j
    
    return -1