def char_to_idx(string):
    # 1-index
    return ord(string) - 96

def solution(n, bans):
    # 숫자로 변환
    for i in range(len(bans)):
        num = 0
        
        size = len(bans[i])
        for j in range(size):
            num += char_to_idx(bans[i][size-1-j]) * 26 **(j)
            
        bans[i] = num
    
    bans.sort()
    
    for ban in bans:
        if ban <= n:
            n += 1
        else:
            break
    
    answer = ''
    
    while n > 0:
        # 0-index로 변환
        n -= 1
        curr = n % 26
        answer = chr(curr + 97) + answer
        n //= 26
    
    return answer