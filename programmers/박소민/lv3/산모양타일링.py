def solution(n, tops):
    MOD = 10007
    # 오른쪽 아래 마름모가 없는 경우
    prev1 = tops[0] + 2
    # 오른쪽 아래 마름모가 있는 경우
    prev2 = 1
    
    for i in range(1, n):
        top = tops[i]
        
        next1 = (prev1 * (top + 2) + prev2 * (top + 1)) % MOD
        next2 = (prev1 + prev2) % MOD
        
        prev1 = next1
        prev2 = next2
    
    return (prev1 + prev2) % MOD