# 설계
# 가지치기 도입 (지금까지 방문한 노드의 비트마스킹) -> set으로 관리
# 지금까지 방문한 노드의 경우 넣기 전에 표시하고 넣어야 하기 때문에
# 먼저 표시하고 -> dfs돌리는 형태
# 이와는 반대로 후보 노드들의 경우 순서가 상관 없다.
# 어차피 dfs 돌리기 전에 확인하므로.
# 따라서 보기 편하게 dfs 돌리고 -> 표시!

def solution(info, edges):
    n = len(info)
    answer = 0
    
    # [수정] 연결리스트 위한 이중 배열 선언
    graph = [[] for _ in range(n)]
    
    # 단방향 간선이므로 끝 노드만 저장
    for [u, v] in edges:
        graph[u].append(v)
        
    # [수정] 가지치기를 위한 set 선언
    visited = set()
    
    def dfs(node, w, s, bit, visited_bit):
        nonlocal answer, visited
        
        # 이미 같은 경로를 방문했다면 반환
        if visited_bit in visited:
            return
        visited.add(visited_bit)
        
        # 양과 늑대 수 갱신
        nw = w + 1 if info[node] == 1 else w
        ns = s + 1 if info[node] == 0 else s
        
        # 종료 조건: 늑대 수 >= 양의 수
        if nw >= ns:
            return
        
        # 답 갱신
        answer = max(answer, ns)
        
        # 현재 노드 제거
        # [수정] XOR 연산
        next_bit = bit ^ (1 << node)
        
        # 다음 후보 활성화
        for i in graph[node]:
            next_bit |= (1 << i)
        
        # 후보 배열의 dfs 찾아서 순회
        for child in range(n):
            if next_bit & (1 << child):
                # 방문 노드 추가
                next_visited_bit = (1 << child) | visited_bit
                dfs(child, nw, ns, next_bit, next_visited_bit)
    
    dfs(0, 0, 0, 1, 1)
    
    return answer