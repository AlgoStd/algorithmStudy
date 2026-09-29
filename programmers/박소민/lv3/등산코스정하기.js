class MinHeap {
    constructor() {this.h = [];}
    size() {return this.h.length;}
    
    push(node) {
        this.h.push(node);
        let i = this.size() - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2); // 다시 확인
            if (this.h[p][1] <= this.h[i][1]) break;
            [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
            i = p;
        }
    }
    
    pop() {
        const top = this.h[0];
        const last = this.h.pop();

        if (this.size() > 0) {
            this.h[0] = last;
            let i = 0;
            const n = this.size();
            
            while (i < n) {
                let smallest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                if (l < n && this.h[l][1] < this.h[smallest][1]) smallest = l;
                if (r < n && this.h[r][1] < this.h[smallest][1]) smallest = r;
                if (smallest === i) break;
                [this.h[smallest], this.h[i]] = [this.h[i], this.h[smallest]];
                i = smallest;
            }
        }
        
        return top;
    }
}

function solution(n, paths, gates, summits) {
    // 1. 다익스트라를 위한 연결리스트 만들기
    const graph = Array.from({length : n + 1}, () => []);
    
    for (const [u, v, w] of paths) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }
    
    // 2. 다익스트라를 위한 우선순위큐 객체 생성 및 거리 배열 생성
    const dist = Array(n + 1).fill(Infinity);
    const pq = new MinHeap();
    
    // 탐색 시간복잡도를 줄이기 위한 꼭대기 Set 변환
    const summitsSets = new Set(summits);
    
    // 3. 출발 지점(gates) 넣어주기
    for (const node of gates) {
        pq.push([node, 0]);
        dist[node] = 0;
    }
    
    while (pq.size()) {
        const [u, d] = pq.pop();
        
        // 이미 거리가 최솟값보다 크다 -> 확인 필요하지 않으므로 continue
        if (dist[u] < d) continue;
        
        // 현재가 산꼭대기인 경우 continue (경로에 산꼭대기가 하나만 있어야하므로)
        if (summitsSets.has(u)) continue;
        
        for (const [v, w] of graph[u]) {
            // 현재 가중치와 연결리스트의 가중치 중 최댓값 저장
            const maxW = Math.max(d, w);
            // 다음 가고자 하는 노드 v의 가중치가 최댓값보다 크다면 넣기 (갱신)
            if (maxW < dist[v]) {
                dist[v] = maxW;
                pq.push([v, maxW]);
            }
        }
    }
    
    // 답 구하기
    let minW = Infinity;
    let minNode;
    
    // 가중치가 같은 경우 산봉우리 노드가 적은 것을 반환해야하므로 오름차순 정렬
    summits.sort((a, b) => a - b); 
    
    for (const node of summits) {
        if (dist[node] < minW) {
            minNode = node;
            minW = dist[node];
        }
    }
     
    return [minNode, minW];
}