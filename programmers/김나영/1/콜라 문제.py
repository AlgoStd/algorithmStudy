def solution(a, b, n):
    answer = 0
    while True:
        if n >= a:
            extra = (n // a)*b
            n = n % a
            answer += extra
            n += extra
        else:
            break
    return answer