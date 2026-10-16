def solution(arr):
    answer = [0, 0]
    
    def conquer(sr, sc, size):
        first = arr[sr][sc]
        
        for r in range(sr, sr + size):
            for c in range(sc, sc + size):
                if (arr[r][c] != first):
                    half = size // 2
                    conquer(sr, sc, half)
                    conquer(sr + half, sc, half)
                    conquer(sr, sc + half, half)
                    conquer(sr + half, sc + half, half)
                    return
        
        answer[first] += 1
    
    conquer(0, 0, len(arr))
    
    return answer