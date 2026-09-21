def gcd(a, b):
    if b == 0:
        return a

    return gcd(b, a % b)
    
def lcm(a, b):
    return int((a * b) / gcd(a, b))

def solution(signals):
    n = len(signals)
    
    total_signals = [0] * n
    
    for i in range(n):
        [g, y, r] = signals[i]
        
        total_signals[i] = g + y + r
        
    total_lcm = 1
    
    for val in total_signals:
        total_lcm = lcm(total_lcm, val)
    
    for t in range(1, total_lcm + 1):
        is_yellow = True
        
        for i in range(n):
            [g, y, r] = signals[i]
            curr = (t - 1) % total_signals[i]
            
            if g > curr or curr >= g + y:
                is_yellow = False
                break
        
        if is_yellow:
            return t
            
    return -1