def solution(food):
    left = ''.join(str(i) * (val // 2) for i, val in enumerate(food))
    
    return left + '0' + left[::-1]