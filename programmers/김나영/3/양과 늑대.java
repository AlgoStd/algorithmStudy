import java.util.*;

class Solution {
    
    int[] info;
    List<List<Integer>> graph;
    int answer;
    
    class Node {
        int index;
        int sheepNum;
        int wolfNum;
        
        Node (int index, int sheepNum, int wolfNum) {
            this.index = index;
            this.sheepNum = sheepNum;
            this.wolfNum = wolfNum;
            
            if (info[index] == 0) {
                this.sheepNum += 1;
            }
            else {
                this.wolfNum += 1;
            }
        }
        
        public boolean check() {
            if (this.sheepNum <= this.wolfNum) return false; // 잡아먹힘
            return true;
        }
    }
    
    public void dfs(Node node, List<Integer> candidates) {
        answer = Math.max(answer, node.sheepNum);

        for (int i = 0; i < candidates.size(); i++) {

            int nxtIndex = candidates.get(i);
            Node nxtNode = new Node(nxtIndex, node.sheepNum, node.wolfNum);
            if (!nxtNode.check()) {
                continue;
            }

            List<Integer> nextCandidates = new ArrayList<>(candidates);

            // 이번에 방문할 노드는 후보에서 제거
            nextCandidates.remove(i);

            // 이번에 방문한 노드의 자식들을 후보에 추가
            nextCandidates.addAll(graph.get(nxtIndex));
            dfs(nxtNode, nextCandidates);
        }
        
    }
    public int solution(int[] info, int[][] edges) {
        this.info = info;
        int n = info.length;
        graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] edge: edges) {
            // 부모, 자식
            graph.get(edge[0]).add(edge[1]);
        }

        List<Integer> candidates = new ArrayList<>();
        candidates.addAll(graph.get(0));
        Node node = new Node(0,0,0);
        dfs(node, candidates);
        return answer;
    }
}