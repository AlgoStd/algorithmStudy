def solution(line):
    stars = []
    # 두 선의 교점들 구하기
    for i in range(len(line)):
        a,b,e = line[i][0], line[i][1], line[i][2]
        for j in range(i+1, len(line)):
            c,d,f = line[j][0], line[j][1], line[j][2]
            if (a*d - b*c) == 0: continue
            x = (b*f-e*d) / (a*d-b*c)
            y = (e*c-a*f) / (a*d-b*c)
            if x == int(x) and y == int(y):
                new_star = [int(x),int(y)]
                if new_star not in stars:
                    stars.append(new_star)
                
    stars.sort(key = lambda x : x[0])
    min_x = stars[0][0]
    max_x = stars[-1][0]
    
    stars.sort(key = lambda x : x[1])
    min_y = stars[0][1]
    max_y = stars[-1][1]
    
    answer = [["." for _ in range(max_x - min_x + 1)] for _ in range(max_y - min_y + 1)]
    
    for x,y in stars:
        row = max_y - y
        col = x - min_x
        answer[row][col] = "*"
        
    return ["".join(row) for row in answer]
