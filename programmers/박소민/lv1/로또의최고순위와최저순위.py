def solution(lottos, win_nums):
    rank = [6, 6, 5, 4, 3, 2, 1]
    
    win_set = set(win_nums)
    
    cnt_0 = 0
    cnt_match = 0
    
    for num in lottos:
        if num == 0:
            cnt_0 += 1
        elif num in win_set:
            cnt_match += 1
    
    return [rank[cnt_0 + cnt_match], rank[cnt_match]]