/*
i번 힌트권은 오직 i번 스테이지에서만
하나의 스테이지에서 사용할 수 있는 힌트권 최대 n-1개
힌트 번들 구매 가능
*/
import java.util.*;
class Solution {
    
    int[][] cost;
    int[][] hint;
    Map<Integer, Integer> map;
    int n;
    int answer;
    
    class Node {
        int stage;
        int cost;
        
        Node (int stage, int cost) {
            this.stage = stage;
            this.cost = cost;
        }
    }
    
    public void dfs (Node node) {
        if (node.stage > n) {
            answer = Math.min(answer, node.cost);
            return;
        }
        
        int curStage = node.stage;
        int nxtStage = node.stage + 1;
        int hintCount = map.getOrDefault(curStage, 0);
        hintCount = Math.min(hintCount, n-1); // 사용 가능한 힌트 최대 n-1개
        
        int nxtCost = node.cost + cost[curStage-1][hintCount];
        
        // 번들 구매 안함
        dfs(new Node(nxtStage, nxtCost));
        
        // 번들 구매
        if (curStage < n) {
            int bundleCost = hint[curStage-1][0];
            
            // 힌트 추가
            for (int i = 1; i < hint[curStage-1].length; i++) {
                int stage = hint[curStage-1][i];
                map.put(stage, map.getOrDefault(stage, 0) + 1);
            }
            
            dfs(new Node(nxtStage, nxtCost + bundleCost));
            
            // 힌트 원복
            for (int i = 1; i < hint[curStage-1].length; i++) {
                int stage = hint[curStage-1][i];
                map.put(stage, map.get(stage) - 1);

                if (map.get(stage) == 0) {
                    map.remove(stage);
                }
            }
        }
        
    }
    public int solution(int[][] cost, int[][] hint) {
        answer = Integer.MAX_VALUE;
        n = cost.length;
        this.cost = cost;
        this.hint = hint;
        map = new HashMap<>(); // 내가 가지고 있는 힌트
        // dfs 백트래킹 느낌 - 번들 구매 기준으로
        // 시작은 스테이지1, 힌트 0개, 비용
        Node node = new Node(1,0);
        dfs(node);
        
        return answer;
    }
}