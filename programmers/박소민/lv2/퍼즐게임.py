def solution(diffs, times, limit):
    n = len(diffs)
    answer = 0
    
    def is_pass(level):
        time = 0
        
        for i in range(n):
            diff = diffs[i]
            time_cur = times[i]
            time_prev = times[i-1] if i > 0 else 0
            
            if diff <= level:
                time += time_cur
            else:
                time += (diff - level) * (time_cur + time_prev) + time_cur
            
            if time > limit:
                return False
        
        return True if time <= limit else False
    
    start = 1
    end = max(diffs)
    
    while start <= end:
        mid = (start + end) // 2
        
        if is_pass(mid):
            answer = mid
            end = mid - 1
        else:
            start = mid + 1
    
    return answer