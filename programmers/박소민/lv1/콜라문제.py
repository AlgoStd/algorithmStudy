# 1. a로 나눈 몫 * b
# 2. a로 나눈 나머지로 갱신
# 3. answer에 갱신
# 4. 1번 + 2번 합한 값이 1보다 클때 계속 반복

def solution(a, b, n):
    answer = 0
    curr = (n // a) * b
    answer += curr
    curr += n % a
    
    while curr >= a:
        answer += (curr // a) * b
        curr = (curr // a) * b + curr % a
        
        
    return answer