from collections import deque

def solution(nodes, edges):
    answer = [0, 0]
    
    visited = {}
    graph = {}
    
    for node in nodes:
        visited[node] = False
        graph[node] = []
        
    for [a, b] in edges:
        graph[a].append(b)
        graph[b].append(a)
    
    def bfs(start):
        nonlocal graph
        nonlocal visited
        
        trees = [0, 0]
        
        queue = deque()
        visited[start] = True
        
        queue.append(start)
        
        while len(queue) > 0:
            cn = queue.popleft()
            
            nn = graph[cn]
            
            if cn % 2 == len(nn) % 2:
                trees[0] += 1
            else:
                 trees[1] += 1
            
            for node in nn:
                if not visited[node]:
                    visited[node] = True
                    queue.append(node)
        
        if trees[0] == 1:
            answer[0] += 1
        if trees[1] == 1:
            answer[1] += 1
    
    for node in nodes:
        if not visited[node]:
            bfs(node)
    
    return answer