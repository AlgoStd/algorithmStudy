#include <vector>
#include <algorithm>

using namespace std;

/*
이 문제는 dfs + 백트래킹으로 사용. (모든 경우의 수를 둘러봐야 하므로 + bfs를 사용하면 공간복잡도가 커지므로)

1. 필요한 변수 현재 red, 현재 blue, 목표 red, 목표 blue, 방문 red 배열, 방문 blue 배열, 최소 턴의 수
2. dfs로 구현
- 종료 조건 : red == 목표 red, blue == 목표 blue
1) red만 이미 목표 지점에 와 있는 경우
blue만 이동 후 dfs
2) blue만 이미 목표 지점에 와 있는 경우
red만 이동 후 dfs
3) 둘 다 아닌 경우
red 이동 -> blue 이동 후 dfs
(이 때 red와 blue가 교차하지 않도록 분기처리)
3. 최소 턴 반환. (답이 나오지 않는다면 0을 반환)

이동하는 조건 (공통)
1. 배열 범위 안에 있는가?
2. 이미 방문하였는가?
3. 벽인가?
4. 둘 중 하나만 목표 지점에 도달한 경우 -> 서로의 지점으로 가려고 하는가?
5. 둘 다 목표 지점에 도달하지 못한 경우 -> 교차하지 않았는가?, 서로 같은 지점으로 가려고 하는가?
*/

using Point = pair<int, int>;

constexpr int dr[4] = {0, 0, 1, -1};
constexpr int dc[4] = {1, -1, 0, 0};

int solution(vector<vector<int>> maze) {
    const int n = maze.size();
    const int m = maze[0].size();
    
    Point end_red, end_blue;
    int min_turn = 1e9;
    
    vector<vector<bool>> red_visited(n, vector<bool>(m, false));
    vector<vector<bool>> blue_visited(n, vector<bool>(m, false));
    
    Point start_red, start_blue;
    
    for (int r = 0; r < n; ++r) {
        for (int c = 0; c < m; ++c) {
            if (maze[r][c] == 1) {
                start_red = {r, c};
                red_visited[r][c] = true;
            } else if (maze[r][c] == 2) {
                start_blue = {r, c};
                blue_visited[r][c] = true;
            } else if (maze[r][c] == 3) {
                end_red = {r, c};
            } else if (maze[r][c] == 4) {
                end_blue = {r, c};
            }
        }
    }
    
    auto is_valid = [&](Point p) {
        return p.first >= 0 && p.first < n &&
            p.second >= 0 && p.second < m &&
            maze[p.first][p.second] != 5;
    };
    
    auto dfs = [&](auto& self, Point red, Point blue, int turn) -> void {
        if (turn >= min_turn) return;
        
        if (red == end_red && blue == end_blue) {
            min_turn = min(min_turn, turn);
            return;
        }
        
        vector<Point> next_reds, next_blues;
        
        if (red == end_red) {
            next_reds.push_back(red);
        } else {
            for (int i = 0; i < 4; ++i) {
                Point nr = {red.first + dr[i], red.second + dc[i]};
                if (is_valid(nr) && !red_visited[nr.first][nr.second]) next_reds.push_back(nr);
            }
        }
        
        if (blue == end_blue) {
            next_blues.push_back(blue);
        } else {
            for (int i = 0; i < 4; ++i) {
                Point nr = {blue.first + dr[i], blue.second + dc[i]};
                if (is_valid(nr) && !blue_visited[nr.first][nr.second]) next_blues.push_back(nr);
            }
        }
        
        for (Point nr : next_reds) {
            for (Point nb : next_blues) {
                if (nr == nb) continue;
                if (nr == blue && nb == red) continue;
                
                bool red_moved = (red != end_red);
                bool blue_moved = (blue != end_blue);
                
                if (red_moved) red_visited[nr.first][nr.second] = true;
                if (blue_moved) blue_visited[nb.first][nb.second] = true;
                
                self(self, nr, nb, turn + 1);
                
                if (red_moved) red_visited[nr.first][nr.second] = false;
                if (blue_moved) blue_visited[nb.first][nb.second] = false;
                
            }
        }
    };
    
    dfs(dfs, start_red, start_blue, 0);
    
    return min_turn == 1e9 ? 0 : min_turn;
}