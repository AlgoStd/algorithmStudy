#include <vector>

using namespace std;

int solution(vector<vector<int>> board, vector<vector<int>> skill) {
    int n = board.size();
    int m = board[0].size();
    vector<vector <int>> arr(n+1, vector<int>(m+1, 0));
    
    // const auto& 읽기 전용! C++11 이상부터
    for (const auto& s : skill) {
        int val = (s[0] == 1) ? -s[5] : s[5];
        int r1 = s[1], c1 = s[2], r2 = s[3], c2 = s[4];
        
        arr[r1][c1] += val;
        arr[r2 + 1][c1] -= val;
        arr[r1][c2 + 1] -= val;
        arr[r2 + 1][c2 + 1] += val;
    }
    
    for (int r = 0; r < n; r++) {
        for (int c = 1; c < m; c++) {
            arr[r][c] += arr[r][c-1];
        }
    }
    
    int answer = 0;
    for (int c = 0; c < m; c++) {
        for (int r = 0; r < n; r++) {
            if (r > 0) {
                arr[r][c] += arr[r-1][c];
            }
            if (board[r][c] + arr[r][c] > 0) {
                answer++;
            }
        }
    }
    
    return answer;
}