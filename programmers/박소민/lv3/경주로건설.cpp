#include <string>
#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

using namespace std;

/*
설계

bfs 알고리즘 (최단 거리를 확장한 최소 비용)
// 근데 여기서 궁금한 점 - 과연 이게 best practice?
동적 계획법 아니야? 왜냐하면 이건 간선에 비용이 있는 거잖아.
bfs + 동적 계획법 (visited가 아닌 cost로)

상태 차의 위치
행동 상하좌우 (방향 전환하는 경우 비용, 전환하지 않는 경우 비용)

1. bfs + 동적 계획법
queue 큐, vector<vector<vector<int>>> cost
cost가 3차원인 이유는 방향전환 시 비용 차이가 발생하므로 같은 위치를
다른 방법으로 올 수 있기 때문
{0, 0, 0} (행, 열, 현재 방향(상하 0/좌우 1))
2. whlie문을 돌면서 n-1, n-1을 만나면 cost[n-1][n-1][방향]에 최소 비용 갱신
3. min(cost[n-1][n-1][0], cost[n-1][n-1][1])
*/

int solution(vector<vector<int>> board) {
    int n = board.size();
    queue<vector<int>> q;
    
    vector<vector<vector<int>>> cost(n, vector<vector<int>>(n, vector<int>(2, INT_MAX)));
    
    // 위: 0, 오: 1, 아: 0, 왼: 1 
    int dr[4] = {0, 1, 0, -1};
    int dc[4] = {1, 0, -1, 0};
    
    q.push({0, 0, 1});
    cost[0][0][1] = 0;
    
    q.push({0, 0, 0});
    cost[0][0][0] = 0;
    
    while (!q.empty()) {
        vector<int> c = q.front();
        int cr = c[0];
        int cc = c[1];
        int cd = c[2];
        q.pop();
        
        if (cr == n-1 && cc == n-1) {
            continue;
        }
        
        for (int i = 0; i < 4; ++i) {
            int nr = cr + dr[i];
            int nc = cc + dc[i];
            int nd = i % 2;
            
            if (nr < 0 || nr > n-1 || nc < 0 || nc > n-1 ||
               board[nr][nc] == 1) continue;
            
            if (cd == nd && cost[nr][nc][nd] > cost[cr][cc][cd] + 100) {
                cost[nr][nc][nd] = cost[cr][cc][cd] + 100;
                q.push({nr, nc, nd});
            } else if (cd != nd && cost[nr][nc][nd] > cost[cr][cc][cd] + 600) {
                cost[nr][nc][nd] = cost[cr][cc][cd] + 600;
                q.push({nr, nc, nd});
            }
        }
        
    }
    
    
    return min(cost[n-1][n-1][0], cost[n-1][n-1][1]);
}