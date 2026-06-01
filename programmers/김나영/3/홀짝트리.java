/*
루트 정해져있을 때 자식 수 = degree
루트 아닌 노드 자식 수 = degree - 1

홀짝트리인 경우
루트 : 노드 홀짝 = degree 홀짝
루트 아닌 경우 : 노드 홀짝 = (degree-1) 홀짝 => 노드 != degree
=> 루트만 홀짝 같아야 함

역홀짝트리인 경우
루트 : 노드 홀짝 != degree 홀짝
루트 아닌 경우 : 노드 홀짝 != (degree-1) 홀짝 => 노드 = degree
=> 루트만 홀짝 달라야 함
*/
import java.util.*;

class Solution {
    public int[] solution(int[] nodes, int[][] edges) {
        int[] answer = new int[2];
        Map<Integer, List<Integer>> graph = new HashMap<>();
        for(int[] edge : edges) {
            int a = edge[0];
            int b = edge[1];
            graph.putIfAbsent(a, new ArrayList<>());
            graph.putIfAbsent(b, new ArrayList<>());
            graph.get(a).add(b);
            graph.get(b).add(a);
        }
        for (int node : nodes) {
            graph.putIfAbsent(node, new ArrayList<>());
        }
        
        Set<Integer> visited = new HashSet<>();
        
        for (int node : nodes) {
            if (!visited.contains(node)) {
                Queue<Integer> q = new LinkedList<>();
                q.add(node);
                visited.add(node);
                
                int holjjak = 0;
                int notHoljjak = 0;
                
                while (!q.isEmpty()) {
                    int cur = q.poll();
                    int child = graph.get(cur).size();
                    if (cur % 2 == child % 2) holjjak++;
                    else notHoljjak++;
                    
                    for (int next : graph.get(cur)) {
                        if (!visited.contains(next)) {
                            visited.add(next);
                            q.add(next);
                        }
                    }
                }
                if (holjjak == 1) answer[0]++;
                if (notHoljjak == 1) answer[1]++;
            }
        }
        return answer;
    }
}