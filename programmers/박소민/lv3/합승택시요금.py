import heapq

def solution(n, s, a, b, fares):
    graph = [[] for _ in range(n + 1)]
    
    for start, end, cost in fares:
        graph[start].append((end, cost))
        graph[end].append((start, cost))
    
    def dijkstra(start):
        dist = [float('inf')] * (n+1)
        dist[start] = 0
        heap = [(0, start)]

        while heap:
            current_dist, current_node = heapq.heappop(heap)
            
            if current_dist > dist[current_node]:
                continue

            for next_node, cost in graph[current_node]:
                new_cost = current_dist + cost
                
                if dist[next_node] > new_cost:
                    dist[next_node] = new_cost
                    heapq.heappush(heap, (new_cost, next_node))
        
        return dist
    
    s_dist = dijkstra(s)
    a_dist = dijkstra(a)
    b_dist = dijkstra(b)
    
    answer = float('inf')
    for k in range(1, n+1):
        cost = s_dist[k] + a_dist[k] + b_dist[k]
        answer = min(answer, cost)
    
    return answer