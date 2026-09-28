def solution(n, q, ans):
    m = len(q)
    answer = 0
    
    password = [];
    
    for i in range(m):
        q[i] = set(q[i])
        
    def dfs(num, length):
        nonlocal answer
        
        if length == 5:
            for i in range(m):
                same_num = 0
                for j in range(5):
                    if password[j] in q[i]:
                        same_num += 1
                
                if same_num != ans[i]:
                    return
            answer += 1
            return
        
        for i in range(num, n + 1):
            password.append(i)
            dfs(i + 1, length + 1)
            password.pop()
    
    dfs(1, 0)
    
    return answer