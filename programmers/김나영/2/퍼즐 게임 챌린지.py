# https://school.programmers.co.kr/learn/courses/30/lessons/340212
def solution(diffs, times, limit):
    answer = 0
    n = len(diffs)
    
    def can(level):
        total = 0
        for i in range(n):
            if diffs[i] <= level:
                total += times[i]
            else:
                mistake = diffs[i] - level
                total += (times[i] + times[i-1]) * mistake + times[i]
        if total <= limit:
            return True
        else:
            return False
    
    right = max(diffs)
    left = 1
    while left <= right:
        mid = (left + right) // 2
        if can(mid):
            answer = mid
            right = mid - 1
        else:
            left = mid + 1
        
    return answer