#include <string>
#include <vector>
#include <queue>

using namespace std;

// 그냥 구현 같은데요. 그냥 해보겠습니다.
/*
1. board의 행과 열을 각각 n-1, r-1까지 순회하면서
[행][열], [행][열+1], [행+1][열], [행+1][열+1]이 모두 같다면('0'이 아니라면) vector 배열에 {행, 열}을 넣어.
2. 해당 배열에 원소가 있다면
해당 배열을 순회하면서 해당 board[행][열], [행][열+1], [행+1][열], [행+1][열+1]을 모두 '0' 표시로 바꿔. (지우기)
3. 밀기
같은 열에서 가장 밑행부터 확인하면서 '0'이 없다면 해당 값을 저장하고 마지막에 가장 밑 행부터 차례대로 밀어 넣어.
4. 1~3번을 해당 배열이 비었을 때까지 실행해. 
*/

int solution(int m, int n, vector<string> board) {
    int answer = 0;
    
    int dr[3] = {0, 1, 1};
    int dc[3] = {1, 0, 1};
    
    while (true) {
        vector<pair<int, int>> arr;
        
        // 2*2 찾아서 해당 배열 저장
        for (int r = 0; r < m - 1; ++r) {
            for (int c = 0; c < n - 1; ++c) {
                if (board[r][c] == '0') continue;
                
                bool is_erase = true;
                for (int i = 0; i < 3; ++i) {
                    int nr = r + dr[i];
                    int nc = c + dc[i];
                    
                    if (board[r][c] != board[nr][nc] || board[nr][nc] == '0') {
                        is_erase = false;
                        break;
                    }
                }
                
                if (is_erase) {
                    arr.push_back({r, c});
                }
            }
        }
        
        if (arr.empty()) break;
        
        // 지우기
        for (auto& pos : arr) {
            int r = pos.first;
            int c = pos.second;
            
            if (board[r][c] != '0') {
                board[r][c] = '0';
                answer++;
            }
            
            for (int i = 0; i < 3; ++i) {
                int nr = r + dr[i];
                int nc = c + dc[i];
                
                if (board[nr][nc] != '0') {
                    board[nr][nc] = '0';
                    answer++;
                }
            }
        }
        
        // 밀어 넣기
        for (int c = 0; c < n; ++c) {
            queue<char> q;
            
            // '0'이 아닌 값을 저장
            for (int r = m - 1; r >= 0; --r) {
                if (board[r][c] != '0') {
                    q.push(board[r][c]);
                }
                
                board[r][c] = '0';
            }
            
            // 해당 열 갱신
            for (int r = m - 1; r >= 0; --r) {
                if (q.empty()) break;
                
                board[r][c] = q.front();
                q.pop();
            }
        }
    }
    
    return answer;
}