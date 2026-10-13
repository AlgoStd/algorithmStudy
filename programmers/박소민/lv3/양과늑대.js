/*
연결리스트
visited 필요 없음(갔던 노드 또 가도 되기 때문에) 대신에 후보 노드 배열 필요.
2^17 = 131072 -> 비트마스킹 가능 -> visited돌기?
순서가 중요하다

후보 노드 백트래킹 구현(시도해보았지만 실패)
후보 노드 인자로 넘기기
*/

function solution(info, edges) {
    const n = info.length;
    // 최대 양을 저장할 수 있는 변수 초기화
    let answer = 0;
    
    // 연결리스트 생성 단방향 간선 (사이클 없는 트리)
    const graph = Array.from({length : n}, () => []);
    
    for (const [u, v] of edges) {
        graph[u].push(v);
    }
    
    // 시작 노드, 늑대 수, 양의 수, 후보 배열
    const dfs = (node, w, s, candidates) => {        
        // 1) 현재 노드 확인 -> 늑대 수, 양의 수 갱신
        const nw = info[node] === 1 ? w + 1 : w;
        const ns = info[node] === 0 ? s + 1 : s;
        
        // 엣지케이스: 늑대의 수가 양의 수보다 같거나 많다면 return
        if (nw >= ns) return;
        
        answer = Math.max(answer, ns);
        
        // 2) 현재 노드에서 다음 노드로 들어가기 위한 후보 노드 추가   
        let nextNodes = candidates;
        
        // [수정] 현재 노드 제거
        // [수정] 0은 왼쪽으로 밀어도 항상 0이기에 1로 밀고 not을 해야 한다.
        nextNodes &= ~(1 << node);
        
        for (const i of graph[node]) {
            // 후보 노드를 1로 변환
            nextNodes |= (1 << i);
        }
        
        // 3) 그 다음 후보 노드로 dfs 돌리기
        for (let i = 0; i < n; i++) {
            // [수정] Truthy한 값 활용
            if ((1 << i) & nextNodes) {
                dfs(i, nw, ns, nextNodes);
            }
        }
        
    };
    
    dfs(0, 0, 0, 1);
    
    return answer;
}