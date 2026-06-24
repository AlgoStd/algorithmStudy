/*
intensity : 휴식 없이 이동해야 하는 시간 중 가장 긴 시간
출입구에서 출발해서 한 곳만 방문 후 다시 원래의 출입구로 돌아옴
intensity가 최소가 되도록
*/
import java.util.*;
class Solution {
    
    List<List<Edge>> graph;
    PriorityQueue<Node> pq;
    int[] intensity;
    int[] gates;
    int[] summits;
    int n;
    boolean[] isSummit;
    
    class Edge {
        int to;
        int cost;
        
        Edge(int to, int cost) {
            this.to = to;
            this.cost = cost;
        }
    }
    
    class Node implements Comparable<Node>{
        int idx;
        int intensity;
        
        Node(int idx, int intensity) {
            this.idx = idx;
            this.intensity = intensity;
        }
        
        @Override
        public int compareTo(Node o) {
            return this.intensity - o.intensity;
        }
    }
    
    // 길 탐색 - 다익스트라
    public void dijkstra() {
        pq = new PriorityQueue<>();
        intensity = new int[n+1];
        Arrays.fill(intensity, Integer.MAX_VALUE);
        
        for (int gate : gates) {
            intensity[gate] = 0;
            pq.offer(new Node(gate, 0));
        }
        
        while (!pq.isEmpty()) {
            Node cur = pq.poll();
            if (isSummit[cur.idx]) continue;
            if (cur.intensity > intensity[cur.idx]) continue;
            for (Edge nxt : graph.get(cur.idx)) {
                int nextIntensity = Math.max(cur.intensity, nxt.cost);
                if (nextIntensity < intensity[nxt.to]) {
                    intensity[nxt.to] = nextIntensity;
                    pq.offer(new Node(nxt.to, nextIntensity));
                }
            }
        }
    }
    
    public int[] solution(int n, int[][] paths, int[] gates, int[] summits) {
        this.gates = gates;
        this.summits = summits;
        this.n = n;
         
        // 길 정보 연결리스트로
        graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] path : paths) {
            graph.get(path[0]).add(new Edge(path[1], path[2]));
            graph.get(path[1]).add(new Edge(path[0], path[2]));
        }
        
        // 정상 정보 초기화
        isSummit = new boolean[n + 1];
        for (int summit : summits) {
            isSummit[summit] = true;
        }
        
        // 다익스트라 탐색
        dijkstra();
        
        // 결과
        Arrays.sort(summits);
        int bestSummit = 0;
        int bestIntensity = Integer.MAX_VALUE;
        
        for (int s : summits) {
            if (intensity[s] < bestIntensity) {
                bestIntensity = intensity[s];
                bestSummit = s;
            }
        }
        return new int[]{bestSummit, bestIntensity};
    }
}