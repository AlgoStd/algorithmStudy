#include <string>
#include <queue>
#include <vector>
#include <climits>

using namespace std;

using MinHeap = priority_queue<int, vector<int>, greater<int>>;
// priority_queue<저장할 데이터 타입 int, 1차원 동적 배열, 비교 연산자 greater<int> || less<int>>

int calculateWaitTime(const vector<int>& mentors_per_type, const vector<vector<int>>& reqs) {
    int total_wait_time = 0;
    int k = mentors_per_type.size();
    
    vector<MinHeap> end_times(k);
    
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < mentors_per_type[i]; j++) {
            end_times[i].push(0);
        }
    }
    
    for (const auto& req : reqs) {
        int start_time = req[0];
        int duration = req[1];
        int type = req[2] - 1;
        
        int earliest_end = end_times[type].top();
        end_times[type].pop();
        
        if (earliest_end <= start_time) {
            end_times[type].push(start_time + duration);
        } else {
            total_wait_time += (earliest_end - start_time);
            end_times[type].push(earliest_end + duration);
        }
    }
    
    return total_wait_time;
}

void dfs(int current_type, int k, int remain_mentors, vector<int>& current_mentors, int& min_wait_time, const vector<vector<int>>& reqs) {
    if (current_type == k) {
        int wait_time = calculateWaitTime(current_mentors, reqs);
        min_wait_time = min(min_wait_time, wait_time);
        return;
    }
    
    if (current_type == k - 1) {
        current_mentors.push_back(remain_mentors);
        dfs(current_type + 1, k, 0, current_mentors, min_wait_time, reqs);
        current_mentors.pop_back();
    } else {
        int max_possible = remain_mentors - (k - current_type - 1);
        for (int i = 1; i <= max_possible; i++) {
            current_mentors.push_back(i);
            dfs(current_type + 1, k, remain_mentors -  i, current_mentors, min_wait_time, reqs);
            current_mentors.pop_back();
        }
    }
}

int solution(int k, int n, vector<vector<int>> reqs) {
    int min_wait_time = INT_MAX;
    vector<int> current_mentors;
    
    dfs(0, k, n, current_mentors, min_wait_time, reqs);
    
    return min_wait_time;
}