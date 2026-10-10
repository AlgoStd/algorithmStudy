def solution(friends, gifts):
    n = len(friends)
    
    # 1. 누구에게 주고 받았는지를 기록할 2차원 배열 선언
    # 주었을 때 + 1, 받았을 때 - 1
    # 따라서 연결하기 위한 dict도 생성
    records = [[0] * n for _ in range(n)] 
    directory = {}
    
    for i in range(n):
        directory[friends[i]] = i
    
    # 2. 선물 지수를 기록할 1차원 배열 선언
    indexes = [0] * n
    
    # 3. gifts를 순회하면서 선물 주고 받는 것 기록
    for record in gifts:
        [giver, taker] = record.split(" ")
        
        giver = directory[giver]
        taker = directory[taker]
        
        # 1) 2차원 배열에 준 사람만 기록
        records[giver][taker] += 1
        
        # 2) 선물 지수 갱신
        indexes[giver] += 1
        indexes[taker] -= 1
    
    # 4. records와 indexes 순회하며 가장 많은 선물을 받는 친구가 받은 선물의 수 갱신
    receives = [0] * n
    for A in range(n):
        for B in range(A + 1, n):
            if records[A][B] > records[B][A]:
                receives[A] += 1
            elif records[A][B] < records[B][A]:
                receives[B] += 1
            else:
                
                if indexes[A] > indexes[B]:
                    receives[A] += 1
                elif indexes[A] < indexes[B]:
                    receives[B] += 1

    return max(receives)