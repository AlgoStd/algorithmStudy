def solution(info, edges):
    n = len(info)
    answer = 0
    
    # [수정] 연결리스트 위한 이중 배열 선언
    graph = [[] for _ in range(n)]
    
    # 단방향 간선이므로 끝 노드만 저장
    for [u, v] in edges:
        graph[u].append(v)
    
    def dfs(node, w, s, arr):
        nonlocal answer
        
        # 양과 늑대 수 갱신
        nw = w + 1 if info[node] == 1 else w
        ns = s + 1 if info[node] == 0 else s
        
        # 종료 조건: 늑대 수 >= 양의 수
        if nw >= ns:
            return
        
        # 답 갱신
        answer = max(answer, ns)
        
        # 다음 후보 배열 넣기
        # [수정] 리스트 컴프리핸션
        nextArr = [child for child in arr if child != node] + graph[node]
        
        # 후보 배열의 dfs 찾아서 순회
        for child in nextArr:
            dfs(child, nw, ns, nextArr)
    
    dfs(0, 0, 0, [])
    
    return answer