def solution(temperature, t1, t2, a, b, onboard):
    n = len(onboard)
    
    temperature += 10
    t1 += 10
    t2 += 10
    
    prev_dp = [float('inf')] * 51
    next_dp = [float('inf')] * 51
    
    prev_dp[temperature] = 0
    
    for i in range(1, n):
        next_dp = [float('inf')] * 51
        
        min_j = 0 if onboard[i] == 0 else t1
        max_j = 50 if onboard[i] == 0 else t2
        
        for j in range(min_j, max_j+1):
            # 1. 에어컨 끈 경우
            # 1) 유지
            if j == temperature and prev_dp[j] != float('inf'):
                next_dp[j] = min(next_dp[j], prev_dp[j])
            
            # 2) 현재온도 올라감 = 이전 온도 < 실외온도
            if j <= temperature and j - 1 >= 0 and prev_dp[j-1] != float('inf'):
                next_dp[j] = min(next_dp[j], prev_dp[j-1])
                
            # 3) 현재온도 내려감 = 이전 온도 > 실외온도
            if j >= temperature and j + 1 <= 50 and prev_dp[j+1] != float('inf'):
                next_dp[j] = min(next_dp[j], prev_dp[j+1])
                
            # 1. 에어컨 킨 경우
            # 1) 유지
            if prev_dp[j] != float('inf'):
                next_dp[j] = min(next_dp[j], prev_dp[j] + b)
            
            # 2) 현재온도 올라감 = 이전 온도 < 실외온도
            if j - 1 >= 0 and prev_dp[j-1] != float('inf'):
                next_dp[j] = min(next_dp[j], prev_dp[j-1] + a)
                
            # 3) 현재온도 내려감 = 이전 온도 > 실외온도
            if j + 1 <= 50 and prev_dp[j+1] != float('inf'):
                next_dp[j] = min(next_dp[j], prev_dp[j+1] + a)
                
        temp = prev_dp
        prev_dp = next_dp
        next_dp = temp
    
    return min(prev_dp)