#include <string>
#include <vector>

using namespace std;

int solution(int n, int w, int num) {
    // 1. num의 0-based 인덱스 및 행/열 계산
    int target_idx = num - 1;
    int target_row = target_idx / w;
    int target_rest = target_idx % w;
    
    // 지그재그 무시하고 왼쪽 기준 절대 열 좌표로 통일
    int target_col = (target_row % 2 == 0) ? target_rest : (w - 1 - target_rest);
    
    // 2. n의 꼭대기 층 정보 계산
    int last_idx = n - 1;
    int max_row = last_idx / w;
    int max_rest = last_idx % w;
    
    // 마지막 상자의 왼쪽 기준 절대 열 좌표
    int last_col = (max_row % 2 == 0) ? max_rest : (w - 1 - max_rest);
    
    // 내 열의 꼭대기에 상자가 존재하는지 판별
    bool has_box_on_top = false;
    if (max_row % 2 == 0) {
        has_box_on_top = (target_col <= last_col);
    } else {
        has_box_on_top = (target_col >= last_col);
    }
    
    int total_height = max_row + (has_box_on_top ? 1 : 0);
    
    return total_height - target_row;
}