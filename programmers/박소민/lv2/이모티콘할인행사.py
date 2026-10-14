# 순열 활용
from itertools import product

def solution(users, emoticons):
    answer = [0, 0]
    
    # [수정] 순열을 활용해서 배열 한번에 만듦
    for sales in product([10, 20, 30, 40], repeat=len(emoticons)):
        plus_cnt, revenue = 0, 0

        for [percent, budget] in users:
            # [수정] sum과 zip을 사용해서 한 번에 계산
            buying = sum(
                p * (100 - s) // 100
                for p, s in zip(emoticons, sales) if s >= percent
            )

            if buying >= budget:
                plus_cnt += 1
            else:
                revenue += buying

        if plus_cnt > answer[0]:
            answer[0] = plus_cnt
            answer[1] = revenue
        elif plus_cnt == answer[0]:
            answer[1] = max(answer[1], revenue)
                    
    return answer