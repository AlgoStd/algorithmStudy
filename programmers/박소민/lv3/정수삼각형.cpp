#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int solution(vector<vector<int>> triangle) {
    const int len = triangle.size();
    int dp[len][len];
    
    dp[0][0] = triangle[0][0];
    
    for (int r = 1; r < len; r++) {
        for (int c = 0; c <= r; c++) {
            if (c == 0) {
                dp[r][c] = dp[r-1][c] + triangle[r][c];
            } else if (c == r) {
                dp[r][c] = dp[r-1][c-1] + triangle[r][c];
            } else {
                dp[r][c] = max(dp[r-1][c-1], dp[r-1][c]) + triangle[r][c];
            }
            
        }
    }
    
    int max_val = -1;
    
    for (int c = 0; c < len; c++) {
        max_val = max(max_val, dp[len-1][c]);
    }
    
    return max_val;
}