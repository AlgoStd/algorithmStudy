import java.util.*;
import java.io.*;

/*S
S : 직진, L : 좌회전, R : 우회전
격자 끝 -> 반대쪽 끝
500 * 500 * 4
상 우 좌 하
*/

public class 빛의_경로_사이클 {
    class Solution {

        static int[] dx = {0, -1, 0, 1};
        static int[] dy = {-1, 0, 1, 0};
        static int n;
        static int m;
        // R : index - 1
        // L : index + 1

        // 어떻게 모든 사이클 돌았는지 확인할 것인지
        // 1. count 확인
        // 2. visited 확인? O(N)만큼 시간 더 소요 x
        // 3차원 배열
        // 유향 그래프, DFS
        static boolean visited[][][];
        static char[][] grids;

        public int[] solution(String[] grid) {
            List<Integer> list = new ArrayList<>();

            n = grid.length;
            m = grid[0].length();
            grids = new char[n][m];
            // y x

            System.out.println(" n : " + n + " m : " + m);

            visited = new boolean[n][m][4]; // 상 우 좌 하
            // y x dir

            // 아오 드럽게 하기 싫네 어쩌다 이런


            for (int i = 0; i < n; i++) {
                grids[i] = grid[i].toCharArray();
            }

            // solve
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    for (int d = 0; d < 4; d++) {
                        if (visited[i][j][d]) continue;

                        // System.out.println("i : " + i + " j : " + j + " d : " + d);
                        int cnt = checkCycle(i, j, d);
                        // System.out.println("i : " + i + " j : " + j + " d : " + d);
                        // System.out.println("cnt : " + cnt);
                        list.add(cnt);
                    }
                }
            }

            Collections.sort(list);
            int[] answer = new int[list.size()];
            for (int i = 0; i < list.size(); i++) {
                answer[i] = list.get(i);
            }

            return answer;
        }

        public static int checkCycle(int y, int x, int dir) { // 해당 방향 사이클 확인
            // 이미 사이클이 존재하는 (visited) 이면 return 이 아니라 for문에서 체크후 돌리기
            int cnt = 0;
            while (true) {
                if (visited[y][x][dir]) {
                    // System.out.println("y : " + y + " x : " + x + " dir : " + dir);
                    break;
                }


                // 서순이 잘못 됨. 방향 전환 후 이동

                visited[y][x][dir] = true;
                if (grids[y][x] == 'L')  {
                    dir = (dir + 1) % 4;
                }
                else if (grids[y][x] == 'R') {
                    dir = (dir + 3) % 4;
                }


                int n_y = (y + dy[dir] + n) % n;
                int n_x = (x + dx[dir] + m) % m;
                x = n_x;
                y = n_y;
                cnt += 1;
            }

            return cnt;
        }
    }
}
