#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 가장 큰 정사각형
int square(vector<vector<string>>& park, int start_r, int start_c) {
    const int row = park.size();
    const int col = park[0].size();
    int max_size = min(row - start_r, col - start_c);
    
    for (int size = 2; size <= max_size; ++size) {
        for (int r = start_r; r < size + start_r; ++r) {
            for (int c = start_c; c < size + start_c; ++c) {
                if (park[r][c] != "-1") {
                    return size - 1;
                }
            }
        }
    }
    
    return max_size;
}

int solution(vector<int> mats, vector<vector<string>> park) {
    int answer = -1;
    const int row = park.size();
    const int col = park[0].size();
    int max_size = 0;
    
    // 1. 순회해서 가장 큰 정사각형 빈공간 찾기
    for (int r = 0; r < row; ++r) {
        for (int c = 0; c < col; ++c) {
            if (park[r][c] == "-1") {
                max_size = max(max_size, square(park, r, c));
            }
        }
        
    }
    
    // 2. mats를 순회하면서 가장 큰 정사각형 빈공간에 맞는 사이즈 찾기
    for (auto& mat : mats) {
        if (max_size >= mat) {
            answer = max(answer, mat);
        }
    }
    
    return answer;
}