#include <string>
#include <vector>
#include <map>

using namespace std;

/*
1. int 충돌 횟수,
struct (현재r<int>, 현재c<int>, 
목표 지점들, 현재 가고 있는 인덱스<int>, 도착했는지 여부<bool>), 
struct를 저장할 vector 배열
2. while 문으로 모든 점들이 도착지점에 도착할 때까지(is_done의 개수 == struct를 저장할 vector 배열의 수) 반복,
    현재 이동하고 있는 점 for 문으로 반복
2.1. 충돌 확인 (충돌이 하나라도 있는 경우 충돌 횟수+1)
map 사용 (좌표를 키로 사용, 매 턴이 끝날 때마다 clear(),
카운트 개수가 2개 이상인 점 확인)
2.2. 방향만 계산 r > c
2.3. 1번만큼 이동
2.4. 목표 좌표로 이동했는지 확인
2.4.1. 목표 좌표로 이동했다면 target_idx++
2.4.2. target_idx == targets.size()라면 종료 (is_done = true)
2.5. 2.1, 2.2., 2.3 반복
*/

struct Robot {
    int current_r;
    int current_c;
    vector<pair<int, int>> targets;
    int target_idx = 1;
    bool is_done = false;
};

int solution(vector<vector<int>> points, vector<vector<int>> routes) {
    int answer = 0;
    vector<Robot> robots;
    
    // 시작 점 초기화
    for (int i = 0; i < routes.size(); i++) {
        vector<pair<int, int>> targets;
        
        for (int point_num : routes[i]) {
            targets.push_back({points[point_num-1][0], points[point_num-1][1]});
        }
        
        robots.push_back({targets[0].first, targets[0].second, targets, 1, false});
    }
    
    int is_done_cnt = 0;
    while (true) {
        map<pair<int, int>, int> position_cnt;
        
        // 1. 충돌 확인
        for (auto& robot : robots) {            
            if (robot.is_done) continue;

            position_cnt[{robot.current_r, robot.current_c}]++;
        }
        
        // 2. 충돌 갱신
        for (auto& pos : position_cnt) {
            if (pos.second >= 2) {
                answer++;
            }
        }
        
        // 3. 퇴근 및 이동
        for (auto& robot: robots) {
            if (robot.is_done) continue;
            
            // 퇴근
            if (robot.target_idx == robot.targets.size()) {
            robot.is_done = true;
            is_done_cnt++;
            continue;
            }
            
            // 이동
            int& r = robot.current_r;
            int& c = robot.current_c;
            int target_r = robot.targets[robot.target_idx].first;
            int target_c = robot.targets[robot.target_idx].second;
            
            if (r != target_r) {
                r = r > target_r ? r - 1 : r + 1;
            } else if (c != target_c) {
                c = c > target_c ? c - 1 : c + 1;
            } 
            
            if (r == target_r && c == target_c) {
                robot.target_idx++;
            }
        }
        
        if (is_done_cnt == robots.size()) break;
    }
    
    return answer;
}