# dfs + 백트래킹
def solution(cost, hint):
    n = len(cost)
    k = len(hint)
    answer = float('inf')
    
    hints = [0] * n
    
    def dfs(level, price):
        nonlocal answer
        
        # [수정] 가지치기 이미 answer가 price보다 작은 경우 반환
        if answer < price:
            return
        
        if level >= n:
            answer = min(answer, price)
            return
        
        c_hint = min(n - 1, hints[level])
        n_price = price + cost[level][c_hint]
        
        # 힌트를 사지 않는 경우
        dfs(level + 1, n_price)
        
        # 힌트를 사는 경우
        if level < n - 1:
            for stage in hint[level][1:]:
                hints[stage - 1] += 1
            
            # [수정] 매개변수에 넣어서 굳이 백트래킹 할 필요 없도록 구현
            dfs(level + 1, n_price + hint[level][0])
            
            for stage in hint[level][1:]:
                hints[stage - 1] -= 1
    
    dfs(0, 0)
    
    return answer