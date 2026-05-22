#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> board, vector<vector<int>> skill) {
    int answer = 0;
    int n = board.size();
    int m = board[0].size();
    vector<vector <int>> arr(n+1, vector<int>(m+1, 0));
    
    for (int i = 0; i < skill.size(); i++) {
        if (skill[i][0] == 1) {
            arr[skill[i][1]][skill[i][2]] -= skill[i][5];
            arr[skill[i][3]+1][skill[i][2]] += skill[i][5];
            arr[skill[i][1]][skill[i][4]+1] += skill[i][5];
            arr[skill[i][3]+1][skill[i][4]+1] -= skill[i][5];
        } else {
            arr[skill[i][1]][skill[i][2]] += skill[i][5];
            arr[skill[i][3]+1][skill[i][2]] -= skill[i][5];
            arr[skill[i][1]][skill[i][4]+1] -= skill[i][5];
            arr[skill[i][3]+1][skill[i][4]+1] += skill[i][5];
        }
    }
    
    for (int r = 0; r < n; r++) {
        for (int c = 1; c < m; c++) {
            arr[r][c] += arr[r][c-1];
        }
    }
    
    for (int r = 1; r < board.size(); r++) {
        for (int c = 0; c < board[0].size(); c++) {
            arr[r][c] += arr[r-1][c];
        }
    }
    
    for (int r = 0; r < board.size(); r++) {
        for (int c = 0; c < board[0].size(); c++) {
            if (arr[r][c] + board[r][c] > 0) {
                answer++;
            }
        }
    }
    
    return answer;
}