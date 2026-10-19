// 현재 위치와 목표 위치까지 남은 거리와 k 비교
// d < l < r < u

import java.util.*;
class Solution {
    
    public int getDistance(int x, int y, int r, int c) {
        return Math.abs(x-r) + Math.abs(y-c);
    }
    
    public boolean checkPossible(int distance, int k) {
        if (distance > k || (k - distance) % 2 != 0) {
            return false;
        }
        else return true;
    }
    
    public String solution(int n, int m, int x, int y, int r, int c, int k) {
        StringBuilder answer = new StringBuilder();
        int[][] graph = new int[n][m];
        graph[x-1][y-1] = 1; // start
        graph[r-1][c-1] = 2; // end
        
        int[] dx = {1,0,0,-1};
        int[] dy = {0,-1,1,0};
        char[] dir = {'d','l','r','u'};
        
        int distance = getDistance(x,y,r,c);
        if (!checkPossible(distance, k)) return "impossible"; // 이동 불가 여부 체크
        
        while (k > 0) {
            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];
                
                if (nx >= 1 && nx <= n && ny >= 1 && ny <= m) {
                    int nextDist = getDistance(nx,ny,r,c);
                    if (nextDist <= k-1) {
                        answer.append(dir[i]);
                        x = nx;
                        y = ny;
                        k--;
                        break;
                    }
                }
            }
        }
        return answer.toString();
    }
}