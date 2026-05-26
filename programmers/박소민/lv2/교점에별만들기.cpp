#include <string>
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

/*
1. 교점 구하기 - 시간복잡도 O(n^2)
2. 점과 별을 찍을 범위 구하기
3. 문자열로 점, 별을 찍어서 answer에 넣기
(a-a')x+(b-b')y+(c-c')=0
x = (-(c-c')-(b-b')y)/(a-a')
*/

vector<string> solution(vector<vector<int>> line) {
    vector<vector<long long>> stars;

    for (int i = 0; i < line.size(); i++) {
        for (int j = i + 1; j < line.size(); j++ ) {
            long long a1 = line[i][0];
            long long b1 = line[i][1];
            long long c1 = line[i][2];

            long long a2 = line[j][0];
            long long b2 = line[j][1];
            long long c2 = line[j][2];
            
            if (a1*b2-a2*b1 == 0) continue;

            if ((a2*c1-a1*c2) % (a1*b2-a2*b1) == 0
               && (b1*c2 - b2*c1) % (a1*b2 - a2*b1) == 0) {
                long long y = (a2*c1-a1*c2) / (a1*b2-a2*b1);
                long long x = (b1*c2 - b2*c1) / (a1*b2 - a2*b1);
                stars.push_back({x, y});
            }
        }
    }
    
    // 별 순회해서 최소 가로, 최소 세로 길이 구하기
    long long min_x = LLONG_MAX;
    long long min_y = LLONG_MAX;
    long long max_x = LLONG_MIN;
    long long max_y = LLONG_MIN;
    
    for (int i=0; i<stars.size(); i++) {
        min_x = min(stars[i][0], min_x);
        min_y = min(stars[i][1], min_y);
        max_x = max(stars[i][0], max_x);
        max_y = max(stars[i][1], max_y);
    }
    
    vector<string> answer(max_y - min_y +1, string(max_x-min_x + 1, '.'));
    
    for (int i=0; i<stars.size(); i++) {
        long long x = stars[i][0];
        long long y = stars[i][1];
        
        answer[max_y - y][x-min_x] = '*';
    }
    
    return answer;
}