# 순위 검색
# dfs + 백트래킹으로 해당 문자열을 키로 정하고 값을 넣는다
# 해시맵 + 키 값
# 시간복잡도 때문에 (query 크기 100,000)
# 찾는 경우 이미 오름차순 정렬 -> 이진트리 탐색 O(nlogn)

def solution(info, query):
    answer = []
    people = {}
    
    for person in info:
        arr = person.split(" ")
        score = int(arr[4])
        
        keys = []
        temp = []
        
        def dfs(depth):
            nonlocal temp
            
            if depth >= 4:
                keys.append(' '.join(temp))
                return
            
            for key in [arr[depth], '-']:
                temp.append(key)
                dfs(depth + 1)
                temp.pop()
    
        dfs(0)
        
        for key in keys:
            if key in people:
                people[key].append(score)
            else:
                people[key] = [score]
                
    for scores in people.values():
        scores.sort()
    
    for curr_q in query:
        q = curr_q.split(" ")
        target_score = int(q[7])
        
        key = f'{q[0]} {q[2]} {q[4]} {q[6]}'
        
        # 엣지케이스 없는 경우
        if key not in people:
            answer.append(0)
            continue
        
        start = 0
        end = len(people[key]) # 이게 왜 아직도 len -1이 아니라 len인지 모르겠음
        # -> 배열에 있는 모든 값이 target_score보다 작은 경우를 구해야 하기 때문에
        
        # (오답) 등호 빼기 -> start == end라면 무한 루프 (end가 len인경우)
        while start < end:
            mid = (start + end) // 2
            
            if people[key][mid] >= target_score:
                end = mid # 이해 안감
            else:
                start = mid + 1
                
        # 그리고 아직도 start, end 헷갈림 왜 start를 빼야하는지 모르겠음
        # start가 target_score에 해당하는 가장 첫 인덱스이기 때문
        answer.append(len(people[key]) - start)
        
    return answer