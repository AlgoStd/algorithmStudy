import java.util.*;

class Solution {
    
    boolean[][] visited;
    int n;
    int m;
    int[] possible;
    int[] dy = {-1,1,0,0};
    int[] dx = {0,0,-1,1};
    
    public int dfs(int i, int j, Set<Integer> cols, int[][] land) {
        visited[i][j] = true;
        cols.add(j);
        
        int count = 1;
        
        for (int k = 0; k < 4; k++) {
            int ni = i + dy[k];
            int nj = j + dx[k];
            if (ni < 0 || ni >= n || nj < 0 || nj >= m) continue;
            if (visited[ni][nj]) continue;
            if (land[ni][nj] == 0) continue;
            
            count += dfs(ni,nj,cols,land);
        }
        return count;
    }
    
    public int solution(int[][] land) {
        int answer = 0;
        n = land.length;
        m = land[0].length;
        possible = new int[m];
        
        // 석유 찾기
        visited = new boolean[n][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!visited[i][j] && (land[i][j] == 1)) {
                    Set<Integer> cols = new HashSet<>();
                    int size = dfs(i,j,cols,land);
                    
                    for (int col : cols) {
                        possible[col] += size;
                    }
                }
            }
        }
        
        for (int oil : possible) {
            answer = Math.max(answer, oil);
        }
        
        return answer;
    }
}