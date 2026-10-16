def solution(depth, money, excavate):
    n = len(depth)
    dp = [[float('inf')] * n for _ in range(n)]
    
    idxes = [[-1] * n for _ in range(n)]
    
    # 구간의 길이가 0인 경우
    for start in range(n):
        dp[start][start] = depth[start]
        idxes[start][start] = start
    
    # 구간의 길이 -> 시작점 -> 구간 안의 인덱스
    for dist in range(1, n):
        # 구간 주의할 것 0, 1, 2 -> 구간의 길이 1, start = 0, 1
        for start in range(0, n - dist):
            end = start + dist # [수정] 보기 편하게 변수 선언
            curr = dp[start][end]
            idx = idxes[start][end] # [수정] dp 잘 못 적음
            
            for k in range(start, start + dist + 1):
                contrast = 0
                
                if k == start:
                    contrast = depth[k] + dp[k + 1][end]
                elif k == end:
                    contrast = depth[k] + dp[start][k - 1]
                else:
                    contrast = depth[k] + max(dp[start][k - 1], dp[k + 1][end])
                
                if curr > contrast:
                    idx = k
                    curr = contrast
            
            dp[start][end] = curr
            idxes[start][end] = idx
    
    # 투포인터로 구하기
    left = 0
    right = n - 1
    
    while left <= right:
        idx = idxes[left][right]
        
        result = excavate(idx + 1)
        
        if result == 0:
            return idx + 1
        elif result == -1:
            right = idx - 1
        elif result == 1:
            left = idx + 1
    
    return 0