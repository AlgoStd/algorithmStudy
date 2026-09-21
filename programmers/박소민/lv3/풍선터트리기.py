def solution(a):
    n = len(a)
    answer = 0
    
    left_arr = [0] * n
    right_arr = [0] * n
    
    left_min = a[0]
    right_min = a[-1]
     
    for i in range(n):
        if left_min >= a[i]:
            left_arr[i] = a[i]
            left_min = a[i]
        else:
            left_arr[i] = left_min
    
    for i in range(n-1, -1, -1):
        if right_min >= a[i]:
            right_arr[i] = a[i]
            right_min = a[i]
        else:
            right_arr[i] = right_min
            
    for i in range(n):
        if left_arr[i] >= a[i] or right_arr[i] >= a[i]:
            answer += 1
    
    return answer