#include <string>
#include <vector>
#include <queue>
#include <array>
#include <climits>
#include <algorithm>

using namespace std;

/*
다익스트라
visited를 사용하지 않고 cost를 또 사용하는 이유
if문을 사용해서 최소 비용인 경우에만 큐에 넣으므로 시간 복잡도가 개선된다.
*/

int solution(vector<vector<int>> board) {
    int n = board.size();
    priority_queue<array<int, 4>> q;
    
    vector<vector<vector<int>>> cost(n, vector<vector<int>>(n, vector<int>(2, -INT_MAX)));
    
    // 위: 0, 오: 1, 아: 0, 왼: 1 
    int dr[4] = {0, 1, 0, -1};
    int dc[4] = {1, 0, -1, 0};
    
    q.push({0, 0, 0, 0}); // 현재 비용, 행, 열, 방향
    cost[0][0][0] = 0;
    
    q.push({0, 0, 0, 1});
    cost[0][0][1] = 0;
    
    while (!q.empty()) {
        auto [c_cost, cr, cc, cd] = q.top();
        q.pop();
        
        if (cr == n-1 && cc == n-1) {
            return -c_cost;
        }
        
        for (int i = 0; i < 4; ++i) {
            int n_cost;
            int nr = cr + dr[i];
            int nc = cc + dc[i];
            int nd = i % 2;
            
            if (nr < 0 || nr > n-1 || nc < 0 || nc > n-1 ||
               board[nr][nc] == 1) continue;
            
            if (cd == nd) {
                n_cost = c_cost - 100;
            } else if (cd != nd) {
                n_cost = c_cost - 600;
            }
            
            if (n_cost > cost[nr][nc][nd]) {
                q.push({n_cost, nr, nc, nd});
                cost[nr][nc][nd] = n_cost;
            }
        }
        
    }
    
    
    return -max(cost[n-1][n-1][0], cost[n-1][n-1][1]);
}