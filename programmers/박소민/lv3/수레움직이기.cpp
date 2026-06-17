#include <string>
#include <vector>
#include <algorithm>

using namespace std;

/*
dfs 백트래킹 (bfs로하면 공간복잡도 터짐 + 관리하기 힘듦)
*/

constexpr int dr[4] = {0, 0, 1, -1};
constexpr int dc[4] = {1, -1, 0, 0};

void dfs(vector<vector<int>>& maze, vector<vector<int>>& red_visited, vector<vector<int>>& blue_visited, pair<int, int> red, const pair<int, int> end_red, pair<int, int> blue, const pair<int, int> end_blue, int turn, int& min_turn) {
    const int n = maze.size();
    const int m = maze[0].size();
    
    // 1. 둘 다 도착지 -> 반환
    if (red == end_red && blue == end_blue) {
        min_turn = min(turn, min_turn);
        return;
    }
    
    // 2. red만 도착지
    else if (red == end_red && blue != end_blue) {
        // blue 처리
        for (int j = 0; j < 4; ++j) {
            int bnr = blue.first + dr[j];
            int bnc = blue.second + dc[j];
            pair<int, int> n_blue = {bnr, bnc};

            if (bnr < 0 || bnr >= n || bnc < 0 || bnc >= m) continue;
            if (blue_visited[bnr][bnc] || n_blue == red ||
                maze[bnr][bnc] == 5) continue;

            blue_visited[bnr][bnc] = 1;
            dfs(maze, red_visited, blue_visited, red, end_red, n_blue, end_blue, turn + 1, min_turn);
            blue_visited[bnr][bnc] = 0;
        }
    }
    
    // 3. blue만 도착지
    else if (red != end_red && blue == end_blue) {
        // red 처리
        for (int i = 0; i < 4; ++i) {
            int rnr = red.first + dr[i];
            int rnc = red.second + dc[i];
            pair<int, int> n_red = {rnr, rnc};

            if (rnr < 0 || rnr >= n || rnc < 0 || rnc >= m) continue;
            if (red_visited[rnr][rnc] || n_red == blue ||
                maze[rnr][rnc] == 5) continue;

            red_visited[rnr][rnc] = 1;

            dfs(maze, red_visited, blue_visited, n_red, end_red, blue, end_blue, turn + 1, min_turn);

            red_visited[rnr][rnc] = 0;
        }
    }
    
    // 4. 기타 남은 케이스
    else {
        // 1. red 먼저 처리
        for (int i = 0; i < 4; ++i) {
            int rnr = red.first + dr[i];
            int rnc = red.second + dc[i];
            pair<int, int> n_red = {rnr, rnc};

            if (rnr < 0 || rnr >= n || rnc < 0 || rnc >= m) continue;
            if (red_visited[rnr][rnc] || maze[rnr][rnc] == 5) continue;

            red_visited[rnr][rnc] = 1;

            // 2. blue 처리
            for (int j = 0; j < 4; ++j) {
                int bnr = blue.first + dr[j];
                int bnc = blue.second + dc[j];
                pair<int, int> n_blue = {bnr, bnc};

                if (bnr < 0 || bnr >= n || bnc < 0 || bnc >= m) continue;
                if (blue_visited[bnr][bnc] || n_blue == n_red ||
                    maze[bnr][bnc] == 5) continue;
                
                // 교차하는 경우 제외
                if (n_blue == red && n_red == blue) continue;

                blue_visited[bnr][bnc] = 1;
                dfs(maze, red_visited, blue_visited, n_red, end_red, n_blue, end_blue, turn + 1, min_turn);
                blue_visited[bnr][bnc] = 0;
            }

            red_visited[rnr][rnc] = 0;
        }
    }

    return;
}

int solution(vector<vector<int>> maze) {
    const int n = maze.size();
    const int m = maze[0].size();
    
    pair<int, int> start_red; pair<int, int> start_blue; 
    pair<int, int> end_red; pair<int, int> end_blue;
    
    int min_turn = 1e9;
    
    vector<vector<int>> red_visited(n, vector<int>(m, 0));
    vector<vector<int>> blue_visited(n, vector<int>(m, 0));
    
    // 1. 시작, 끝 점 초기화
    for (int r = 0; r < n; ++r) {
        for (int c = 0; c < m; ++c) {
            if (maze[r][c] == 1) {
                start_red = {r, c};
                red_visited[r][c] = 1;
            } else if (maze[r][c] == 2) {
                start_blue = {r, c};
                blue_visited[r][c] = 1;
            } else if (maze[r][c] == 3) {
                end_red = {r, c};
            } else if (maze[r][c] == 4) {
                end_blue = {r, c};
            }
        }
    }
    
    // 2. dfs + 백트래킹
    dfs(maze, red_visited, blue_visited, start_red, end_red, start_blue, end_blue, 0, min_turn);
    
    return min_turn != 1e9 ? min_turn : 0;
}