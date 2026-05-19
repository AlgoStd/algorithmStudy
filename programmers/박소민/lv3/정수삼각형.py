

def solution(triangle):
    LEN = len(triangle)
    arr = [[0] * (i+1) for i in range(LEN)]
    
    arr[0][0] = triangle[0][0]
    
    for r in range(1, LEN):
        for c in range(r+1):
            curr = triangle[r][c]
            if c == 0:
                arr[r][c] = curr + arr[r-1][0]
            elif c == r:
                arr[r][c] = curr + arr[r-1][c-1]
            else:
                arr[r][c] = curr + max(arr[r-1][c-1], arr[r-1][c])

    return max(arr[LEN-1])