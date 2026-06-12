#include <string>
#include <vector>
#include <deque>
#include <algorithm>

using namespace std;

int solution(vector<vector<int>> board) {
    int answer = 99999999;
    int n = board.size();
    deque<vector <int>> queue;
    
    vector<vector<vector<int>>> cost(n, vector<vector<int>>(n, vector<int>(4, 99999999)));
    
    // 위: 0, 오: 1, 아: 2, 왼: 3 
    int dr[4] = {0, 1, 0, -1};
    int dc[4] = {1, 0, -1, 0};
    
    queue.push_back({0, 0, -1, 0});
    
    while (queue.size() > 0) {
        vector<int> curr = queue[0];
        queue.pop_front();
        
        if (curr[0] == n-1 && curr[1] == n-1) {
            answer = min(answer, curr[3]);
        }
        
        for (int i=0; i<4; i++) {
            int next_r = curr[0] + dr[i];
            int next_c = curr[1] + dc[i];
            int next_cost = curr[3];
            
            if (next_r < 0 || next_r > n-1 || next_c < 0 || next_c > n-1 ) continue;

            if (board[next_r][next_c] == 1) continue;
            
            if (curr[2] == i || curr[2] == -1) {
                next_cost += 100;
            } else {
                next_cost += 600;
            }
            
            if (next_cost < cost[next_r][next_c][i]) {
                cost[next_r][next_c][i] = next_cost;
                queue.push_back({next_r, next_c, i, next_cost});
            }
        }
        
    }
    
    
    return answer;
}