from collections import defaultdict
from itertools import combinations

def solution(friends, gifts):
    n = len(friends)
    
    # 1. 누구에게 주고 받았는지를 기록할 2차원 배열 선언
    # 주었을 때 + 1
    # [수정] 길이가 길어졌을 때의 공간복잡도를 방어하기 위해 2차원 dict 생성
    # 공간복잡도를 좀 더 최적화하기 위해 defaultdict 사용
    # defaultdict(int)에서 int는 0을 반환하므로 2차원 dict로 바로 접근할 수 있다.
    # (초기화할 필요 없다)
    records = defaultdict(lambda: defaultdict(int))
    
    # 2. 선물 지수를 기록할 1차원 배열 선언
    indexes = {name: 0 for name in friends}
    
    # 3. gifts를 순회하면서 선물 주고 받는 것 기록
    for record in gifts:
        #[수정] split() 메서드만 사용해도 알아서 공백으로 나눠준다.
        [giver, taker] = record.split()
        
        # 1) 2차원 배열에 준 사람만 기록
        records[giver][taker] += 1
        
        # 2) 선물 지수 갱신
        indexes[giver] += 1
        indexes[taker] -= 1
    
    # 4. records와 indexes 순회하며 가장 많은 선물을 받는 친구가 받은 선물의 수 갱신
    receives = {name: 0 for name in friends}
    
    # [수정] combinations를 사용하여 2개만 뽑아내도록 구현
    for A, B in combinations(friends, 2):
        if records[A][B] > records[B][A]:
            receives[A] += 1
        elif records[A][B] < records[B][A]:
            receives[B] += 1
        else:

            if indexes[A] > indexes[B]:
                receives[A] += 1
            elif indexes[A] < indexes[B]:
                receives[B] += 1

    return max(receives.values())