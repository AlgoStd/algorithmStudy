def solution(a):
    n = len(a)
    
    if n == 2:
        return n
    
    answer = 2
    
    left_min = a[0]
    right_min = a[n - 1]
    
    left = 1
    right = n - 2
    
    while left <= right:
        if left_min < right_min:
            if a[right] < right_min:
                answer += 1
                right_min = a[right]
            
            right -= 1
        else:
            if a[left] < left_min:
                answer += 1
                left_min = a[left]
            
            left += 1
    
    return answer