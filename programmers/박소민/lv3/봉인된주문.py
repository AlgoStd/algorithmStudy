def to_num(string):
    num = 0
    for char in string:
        # 1-index
        # [수정] 누적 방식 * 26
        num = num * 26 + ord(char) - ord('a') + 1
    return num

def solution(n, bans):
    new_bans = sorted([to_num(w) for w in bans])
    
    for ban in new_bans:
        if ban <= n:
            n += 1
        else:
            break
    
    answer = ''
    
    while n > 0:
        # 0-index로 변환
        n -= 1
        curr = n % 26
        answer = chr(curr + ord('a')) + answer
        n //= 26
    
    return answer