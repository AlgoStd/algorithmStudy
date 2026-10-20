# 1차원 dp + 역순으로 해서 상태 오염 방지
def solution(triangle):
    LEN = len(triangle)
    dp = [0] * (LEN)
    
    dp[0] = triangle[0][0]
    
    for r in range(1, LEN):
        for c in range(r, -1, -1):
            curr = triangle[r][c]
            
            if c == 0:
                dp[c] = curr + dp[0]
            elif c == r:
                dp[c] = curr + dp[c-1]
            else:
                dp[c] = curr + max(dp[c-1], dp[c])

    return max(dp)