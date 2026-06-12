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
    vector<int> results(m, 0);
    
    int dr[4] = {0, 0, 1, -1};
    int dc[4] = {1, -1, 0, 0};
    
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < m; c++) {
            if (land[r][c] == 1) {
                queue<pair<int, int>> q;
                int min_col = c;
                int max_col = c;
                int cnt = 0;
                q.push({r, c});
                
                // 처음 방문처리 할 것
                land[r][c] = 0;
                
                while (!q.empty()) {
                    pair<int, int> pos = q.front();
                    q.pop();
                    
                    int cr = pos.first;
                    int cc = pos.second;
                    
                    min_col = min(min_col, cc);
                    max_col = max(max_col, cc);
                    cnt++;
                    
                    for (int i = 0; i < 4; i++) {
                        int nr = cr + dr[i];
                        int nc = cc + dc[i];
                        
                        if (nr >= n || nr < 0 || nc >= m || nc < 0) continue;
                        
                        if (land[nr][nc] == 1) {
                            q.push({nr, nc});
                            land[nr][nc] = 0;
                        }
                    }
                }
                
                for (int col = min_col; col <= max_col; col++) {
                    results[col] += cnt;
                }
                
            }
        }
    }
    
    // 최댓값 확인
    auto answer = max_element(results.begin(), results.end());
    
    return *answer;
}