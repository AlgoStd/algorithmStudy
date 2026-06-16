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

const char EMPTY = '0';
using Position = pair<int, int>;

const int dr[4] = {0, 0, 1, 1};
const int dc[4] = {0, 1, 0, 1};

vector<Position> findMatchedBlocks(int m, int n, const vector<string>& board) {
    vector<Position> matched;
    for (int r = 0; r < m - 1; ++r) {
        for (int c = 0; c < n - 1; ++c) {
            char current = board[r][c];
            if (current == EMPTY) continue;
            
            bool is_match = true;
            for (int i = 1; i < 4; ++i) {
                int nr = r + dr[i];
                int nc = c + dc[i];
                if (board[nr][nc] != current) {
                    is_match = false;
                    break;
                }
            }
            
            if (is_match) {
                matched.push_back({r, c});
            }
        }
    }
    
    return matched;
}

int eraseBlocks(const vector<Position>& matched, vector<string>& board) {
    int erased_count = 0;
    
    for (const auto& pos : matched) {
        int r = pos.first;
        int c = pos.second;
        
        for (int i = 0; i < 4; ++i) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            
            if (board[nr][nc] != EMPTY) {
                board[nr][nc] = EMPTY;
                erased_count++;
            }
        }
    }
    
    return erased_count;
}

void applyGravity(int m, int n, vector<string>& board) {
    for (int c = 0; c < n; ++c) {
        queue<char> surviving_blocks;
        
        for (int r = m - 1; r >= 0; --r) {
            if (board[r][c] != EMPTY) {
                surviving_blocks.push(board[r][c]);
                board[r][c] = EMPTY;
            }
        }
        
        for (int r = m - 1; r >= 0 && !surviving_blocks.empty(); --r) {
            board[r][c] = surviving_blocks.front();
            surviving_blocks.pop();
        }
    }
}

int solution(int m, int n, vector<string> board) {
    int total_erased = 0;
    
    while (true) {
        vector<Position> matched = findMatchedBlocks(m, n, board);
        
        if (matched.empty()) {
            break;
        }
        
        total_erased += eraseBlocks(matched, board);
        
        applyGravity(m, n, board);
    }
    
    return total_erased;
}