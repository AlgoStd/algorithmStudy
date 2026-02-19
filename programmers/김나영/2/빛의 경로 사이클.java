/*
S 직진
L 좌회전
R 우회전
빛이 격자 끝 넘어가면 반대쪽 끝으로 다시 돌아옴
*/

import java.util.*;

class Solution {
    static int n,m;
    static int[][] graph;
    static String[] grid;
    
    // 시계방향 : 상 우 하 좌
    static int[] dy = {-1,0,1,0};
    static int[] dx = {0,1,0,-1};
    
    static int[] move(int y, int x, int k) {
        char c = grid[y].charAt(x);
        if (c == 'L') {
            // 좌회전
            k--;
            if (k < 0) k = 3;
        } else if (c == 'R') {
            // 우회전
            k++;
            if (k > 3) k = 0;
        }
        
        int ny = y + dy[k];
        int nx = x + dx[k];
        if ((0 <= ny) && (ny < n) && (0 <= nx) && (nx < m)) {
            // 격자 안에 들어온다면
        } else {
            // 격자 밖이라면
            if (ny < 0) ny = n-1;
            if (ny >= n) ny = 0;
            if (nx < 0) nx = m-1;
            if (nx >= m) nx = 0;
        }
        int[] result = new int[3];
        result[0] = ny;
        result[1] = nx;
        result[2] = k;
        return result;
    }

    public int[] solution(String[] grid) {
        grid = grid;
        List<Integer> answer = new ArrayList<>();
        // 시작 지점 모두 구함
        // 빛 돌리고
        // 마지막 지점 리턴해서 시작, 마지막, 길이 저장
        n = grid.length;
        m = grid[0].length();
        graph = new int[n][m]; // 사이클 정보 저장
        
        int turn = 1;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                // 시작점
                for (int k = 0; k < 4; k++) {
                    // 들어가는 방향
                    if (graph[i][j] > 0) {
                        continue;
                    }
                    graph[i][j] = turn++;
                    int count = 0;
                    while (true) {
                        int[] result = move(i,j,k);
                        count++;
                        if ((result[0] == i) && (result[1] == j)) break;
                    }
                    answer.add(count);
                }
            }
        }
        Collections.sort(answer);
        return answer.stream().mapToInt(Integer::intValue).toArray();
    }
}
