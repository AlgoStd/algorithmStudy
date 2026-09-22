# 1번 방식 : 2차원 배열로 풀기

def solution(info, n, m):
    length = len(info)
    
    # 1. A의 최대값 n - 1 ~ 0까지 배열 선언
    # 2차원 배열이므로 이를 length만큼 반복
    dp = [[float('inf')] * n for _ in range(length + 1)]
    
    # 2. 아무것도 넣지 않은 경우 0으로 초기화
    dp[0][0] = 0
    
    for i in range(1, length + 1):
        [a, b] = info[i-1]
        
        for j in range(n):
            if dp[i-1][j] == float('inf'):
                continue
            
            prevB = dp[i-1][j]
            
            # A가 훔치는 경우 -> 이 부분이 이해가 안가 왜 prevB랑 비교해?
            if j + a < n:
                dp[i][j + a] = min(dp[i][j + a], prevB)
                
            # B가 훔치는 경우
            if prevB + b < m:
                dp[i][j] = min(dp[i][j], prevB + b)
    
    for j in range(n):
        if dp[length][j] < m:
            return j
    
    return -1