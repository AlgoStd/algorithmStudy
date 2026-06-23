# https://school.programmers.co.kr/learn/courses/30/lessons/340198?language=python3
def solution(mats, park):
    n = len(park)
    m = len(park[0])
    mats.sort(reverse=True)
    for size in mats:
        for i in range(n - size + 1):
            for j in range(m - size + 1):
                possible = True
                for r in range(i, i+size):
                    for c in range(j, j+size):
                        if park[r][c] != '-1':
                            possible = False
                            break
                    if not possible:
                        break   
                if possible:
                    return size
    return -1