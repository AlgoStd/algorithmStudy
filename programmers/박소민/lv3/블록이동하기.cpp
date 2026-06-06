#include <string>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

int solution(vector<vector<int>> board) {
    int n = board.size();
    
    int dr[4] = {0, 0, 1, -1};
    int dc[4] = {1, -1, 0, 0};
    int d[2] = {1, -1};
    
    vector<vector<vector<bool>>> visited(n, vector<vector<bool>>(n, vector<bool>(2, false)));
    
    queue<vector<int>> q;
    
    q.push({0, 0, 0, 0}); // 가로 0, 세로 1
    visited[0][0][0] = true;
    
    while (!q.empty()) {
        vector<int> curr = q.front();
        int r = curr[0];
        int c = curr[1];
        int direction = curr[2];
        int time = curr[3];
        q.pop();
        
        if ((direction == 0 && r == n - 1 && c == n - 2) ||
            (direction == 1 && r == n - 2 && c == n - 1)) {
            return time;
        }
        
        // 1. 가로인 경우
        if (direction == 0) {
            // 1) 회전하지 않는 경우
            for (int i = 0; i < 4; i++) {
                int nr1 = r + dr[i];
                int nc1 = c + dc[i];
                int nr2 = r + dr[i];
                int nc2 = c + dc[i] + 1;
                
                if (nr1 < 0 || nr1 >= n || nc1 < 0 || nc2 >= n) continue;
                if (board[nr1][nc1] || board[nr2][nc2]) continue;
                if (visited[nr1][nc1][direction]) continue;
                
                q.push({nr1, nc1, direction, time + 1});
                visited[nr1][nc1][0] = true;
            }
            
            // 2) 회전하는 경우
            for (int i = 0; i < 2; i++) {
                int nr1 = r + d[i];
                int nc1 = c;
                int nr2 = r + d[i];
                int nc2 = c + 1;
                
                if (nr1 < 0 || nr1 >= n || nc1 < 0 || nc2 >= n) continue;
                if (board[nr1][nc1] || board[nr2][nc2]) continue;
                
                int new_r = (d[i] == 1) ? r : r - 1;
                
                if (!visited[new_r][c][!direction]) {
                    q.push({new_r, c, !direction, time + 1});
                    visited[new_r][c][!direction] = true;
                }
                
                if (!visited[new_r][c+1][!direction]) {
                    q.push({new_r, c + 1, !direction, time + 1});
                    visited[new_r][c+1][!direction] = true;
                }
            }
        } 
        // 2. 세로인 경우
        else {
            // 1) 회전하지 않는 경우
            for (int i = 0; i < 4; i++) {
                int nr1 = r + dr[i];
                int nc1 = c + dc[i];
                int nr2 = r + dr[i] + 1;
                int nc2 = c + dc[i];
                
                if (nr1 < 0 || nr2 >= n || nc1 < 0 || nc2 >= n) continue;
                if (board[nr1][nc1] || board[nr2][nc2]) continue;
                if (visited[nr1][nc1][direction]) continue;
                
                q.push({nr1, nc1, direction, time + 1});
                visited[nr1][nc1][direction] = true;
            }
            
            // 2) 회전하는 경우
            for (int i = 0; i < 2; i++) {
                int nr1 = r;
                int nc1 = c + d[i];
                int nr2 = r + 1;
                int nc2 = c + d[i];
                
                if (nr1 < 0 || nr2 >= n || nc1 < 0 || nc1 >= n) continue;
                if (board[nr1][nc1] || board[nr2][nc2]) continue;
                
                int new_c = (d[i] == 1) ? c : c - 1;
                
                if (!visited[r][new_c][!direction]) {
                    q.push({r, new_c, !direction, time + 1});
                    visited[r][new_c][!direction] = true;
                }
                
                if (!visited[r+1][new_c][!direction]) {
                    q.push({r+1, new_c, !direction, time + 1});
                    visited[r+1][new_c][!direction] = true;
                }
            }
        }
    }
    
    return 0;
}