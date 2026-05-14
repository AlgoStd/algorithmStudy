import java.util.*;

class Solution {
    
    Map<String, Integer> map = new HashMap<>();
    
    public void record(int time, int r, int c) {
        String key = time + "," + r + "," + c;
        map.put(key, map.getOrDefault(key, 0)+1);
    }
    
    public int solution(int[][] points, int[][] routes) {
        int answer = 0;
        for (int[] route : routes) {
            int startPoint = route[0] - 1;
            int r = points[startPoint][0];
            int c = points[startPoint][1];
            
            int time = 0;
            record(time, r, c);
            
            for (int i = 1; i < route.length; i++) {
                int nextPoint = route[i] - 1;
                int targetR = points[nextPoint][0];
                int targetC = points[nextPoint][1];
                
                // 최단 경로 이동
                // r 먼저 이동
                while (r != targetR) {
                    if (r < targetR) r++;
                    else r--;
                    time++;
                    record(time, r, c);
                }
                
                // c 먼저 이동
                while (c != targetC) {
                    if (c < targetC) c++;
                    else c--;
                    time++;
                    record(time, r, c);
                }
            }
        }
        
        for (int count : map.values()) {
            if (count >= 2) {
                answer++;
            }
        }
        
        return answer;
    }
}