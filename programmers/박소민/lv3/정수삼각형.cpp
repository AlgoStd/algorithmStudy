#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int solution(vector<vector<int>> triangle) {
    // 바텀업으로 활용
    for (int r = triangle.size() - 2; r >= 0; r--) {
        for (int c = 0; c <= r; c++) {
            triangle[r][c] += max(triangle[r+1][c],  triangle[r+1][c+1]);
        }
    }
    
    return triangle[0][0];
}