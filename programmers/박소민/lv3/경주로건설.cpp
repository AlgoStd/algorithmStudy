#include <vector>
#include <queue>
#include <array>
#include <algorithm>

using namespace std;

/*
다익스트라
visited를 사용하지 않고 cost를 또 사용하는 이유
if문을 사용해서 최소 비용인 경우에만 큐에 넣으므로 시간 복잡도가 개선된다.
*/

const int INF = 1e9;

int solution(vector<vector<int>> board) {
    int n = board.size();
    
    priority_queue<array<int, 4>, vector<array<int, 4>>, greater<array<int, 4>>> pq;
    
    vector<vector<vector<int>>> cost(n, vector<vector<int>>(n, vector<int>(2, INF)));
    
    // 위: 0, 오: 1, 아: 0, 왼: 1 
    int dr[4] = {0, 1, 0, -1};
    int dc[4] = {1, 0, -1, 0};
    
    pq.push({0, 0, 0, 0}); // 현재 비용, 행, 열, 방향
    cost[0][0][0] = 0;
    
    pq.push({0, 0, 0, 1});
    cost[0][0][1] = 0;
    
    while (!pq.empty()) {
        auto [c_cost, cr, cc, cd] = pq.top();
        pq.pop();
        
        if (cost[cr][cc][cd] < c_cost) continue;
        
        if (cr == n-1 && cc == n-1) {
            return c_cost;
        }
        
        for (int i = 0; i < 4; ++i) {
            int nr = cr + dr[i];
            int nc = cc + dc[i];
            int nd = i % 2;
            
            if (nr < 0 || nr >= n || nc < 0 || nc >= n ||
               board[nr][nc] == 1) continue;
            
            int n_cost = c_cost + ((cd == nd) ? 100 : 600);
            
            if (n_cost < cost[nr][nc][nd]) {
                cost[nr][nc][nd] = n_cost;
                pq.push({n_cost, nr, nc, nd});
            }
        }
        
    }
    
    
    return min(cost[n-1][n-1][0], cost[n-1][n-1][1]);
}