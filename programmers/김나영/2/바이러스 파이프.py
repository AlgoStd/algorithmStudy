from collections import deque
from itertools import product

def solution(n, infection, edges, k):
    graph = [[] for _ in range(n+1)]
    start_pipe_types = set()
    for x,y,t in edges:
        graph[x].append((y,t))
        graph[y].append((x,t))
        start_pipe_types.add(t)
        
    polluted = [False for _ in range(n+1)]    
    infected_nodes = [infection]
    # 오염시키는 함수
    def bfs(infected_nodes, pipe_type):
        q = deque()
        for node in infected_nodes:
            q.append(node)
            polluted[node] = True
        polluted_count = 0
        while q:
            cur = q.popleft()
            for nxt, nxt_pipe_type in graph[cur]:
                if nxt_pipe_type == pipe_type and not polluted[nxt]:
                    polluted[nxt] = True
                    polluted_count += 1
                    q.append(nxt)
                    infected_nodes.append(nxt)
        return polluted_count
    
    
    max_count = 0
    for seq in product(list(start_pipe_types), repeat=k):
        polluted = [False for _ in range(n+1)]
        polluted[infection] = True
        infected_nodes = [infection]
        count = 1
        for p in seq:
            count += bfs(infected_nodes, p)
        max_count = max(max_count, count)

    return max_count