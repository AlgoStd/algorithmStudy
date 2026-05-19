def solution(n, w, num):
    answer = 0
    boxes = [[] for _ in range(w)]
    
    for i in range(n):
        rest = i % w
        val = i // w
        
        if val % 2 == 0:
            boxes[rest].append(i+1)
        else:
            boxes[w-rest-1].append(i+1)
            
    REST = (num-1) % w
    VAL = (num-1) // w
    
    idx = REST if VAL % 2 == 0 else w-REST-1
            
    for val in boxes[idx][::-1]:
        if val < num:
            break
        answer += 1
    
    return answer