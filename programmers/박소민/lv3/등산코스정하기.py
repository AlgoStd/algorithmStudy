import heapq

def solution(n, paths, gates, summits):
    # 1. 연결리스트 생성
    graph = [[] for _ in range(n+1)]
    
    for [u, v, w] in paths:
        graph[u].append([v, w])
        graph[v].append([u, w])
        
    # 2. 거리 생성
    dist = [float('inf')] * (n + 1)
    
    # 3. 다익스트라를 위한 우선순위 큐 생성
    pq = []
    
    for gate in gates:
        heapq.heappush(pq, [gate, 0])
        dist[gate] = 0
        
    # 참고) 빠른 탐색을 위한 꼭대기 set으로 바꾸기
    summits_set = set(summits)
    
    while pq:
        [u, d] = heapq.heappop(pq)
        
        if dist[u] < d:
            continue
        if u in summits_set:
            continue
        
        for [v, w] in graph[u]:
            maxW = max(w, d)
            if maxW < dist[v]:
                dist[v] = maxW
                heapq.heappush(pq, [v, maxW])
    
    # 4. 답 구하기 (꼭대기 오름차순 정렬)
    answer = [0, 0]
    
    summits.sort()
    minW = float('inf')
    
    for node in summits:
        if minW > dist[node]:
            answer[0] = node
            minW = dist[node]
    
    return [answer[0], minW]