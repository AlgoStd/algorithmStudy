#include <string>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

/*
1. int 최대 석유량, vector<int> 열 크기만큼 결과 배열
2. 이중 for문 순회(브루트포스 알고리즘)
해당 위치에 석유가 있는 경우 (board[r][c]=1)
int 최소열=해당 위치의 열, int 최대열=해당 위치의 열, int 석유 개수=0, queue q, q.push({현재행, 현재열})로 bfs 시작
큐에서 좌표 꺼낼 때마다 석유 개수++, 최소열/최대열 갱신
3. while문이 끝나면 최소열부터 최대열까지 석유 개수 결과 배열에 갱신
4. 결과 배열에 최댓값 도출 
*/

int solution(vector<vector<int>> land) {
    int n = land.size();
    int m = land[0].size();
    
    vector<int> col_oil_sum(m, 0);
    
    const int dr[4] = {0, 0, 1, -1};
    const int dc[4] = {1, -1, 0, 0};
    
    auto bfs = [&](int start_r, int start_c) {
        queue<pair<int, int>> q;
        q.push({start_r, start_c});
        land[start_r][start_c] = 0;
        
        int min_col = start_c;
        int max_col = start_c;
        int oil_count = 0;
        
        while (!q.empty()) {
            auto [cr, cc] = q.front();
            q.pop();
            
            min_col = min(min_col, cc);
            max_col = max(max_col, cc);
            oil_count++;
            
            for (int i = 0; i < 4; i++) {
                int nr = cr + dr[i];
                int nc = cc + dc[i];
                
                if (nr >= 0 && nr < n && nc >= 0 && nc < m 
                   && land[nr][nc] == 1) {
                    q.push({nr, nc});
                    land[nr][nc] = 0;
                }
            }
        }
        
        for (int col = min_col; col <= max_col; col++) {
            col_oil_sum[col] += oil_count;
        }
    };
    
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < m; c++) {
            if (land[r][c] == 1) {
                bfs(r, c);                
            }
        }
    }
    
    return *max_element(col_oil_sum.begin(), col_oil_sum.end());;
}