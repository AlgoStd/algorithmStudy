def solution(mats, park):
    answer = -1
    
    row = len(park)
    col = len(park[0])
    
    maxl = 0
    
    for r in range(row):
        for c in range(col):
            if park[r][c] == "-1":
                l = 1
                while True:
                    is_possible = True
                    
                    for i in range(l):
                        for j in range(l):
                            if r + i >= row or c + j >= col:
                                is_possible = False
                                break
                            
                            if park[r+i][c+j] != "-1":
                                is_possible = False
                                break
                        if not is_possible:
                            break
                    
                    if not is_possible:
                        l -= 1
                        break
                    
                    l += 1
                
                maxl = max(maxl, l)
    
    for mat in mats:
        if maxl >= mat and answer < mat:
            answer = mat
    
    return answer