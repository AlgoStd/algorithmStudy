#include <string>
#include <vector>

using namespace std;

int solution(int n, int w, int num) {
    int answer = 0;
    int max_r = (n-1) / w;
    int max_rest = (n-1) % w;
    
    // 1. num의 행과 열을 구한다.
    int r = (num-1) / w;
    int rest = (num-1) % w;
    
    // 2. num의 열의 최상단 행을 구해 answer를 갱신한다.
    if (max_r % 2 == 0 && r % 2 == 0) {
        answer = rest <= max_rest ? max_r - r + 1 : max_r - r;
    } else if (max_r % 2 != 0 && r % 2 == 0) {
        answer = (w-1) - max_rest <= rest ? max_r - r + 1 : max_r - r;
    } else if (max_r % 2 == 0 && r % 2 != 0) {
        answer = (w-1) - rest <= max_rest ? max_r - r + 1 : max_r - r;
    } else {
        answer = rest <= max_rest ? max_r - r + 1 : max_r - r;
    }
    
    return answer;
}