#include <string>
#include <vector>
#include <climits>

using namespace std;

void calculate_time(vector<int>& current_mentors, int& min_time, vector<vector<int>>& reqs) {
    vector<vector <int>> times;
    int delay_time = 0;
    
    // 1. 초기화
    for (int i=0; i<current_mentors.size(); i++) {
        vector<int> arr(current_mentors[i], 0);
        
        times.push_back(arr);
    }
    
    for (int i=0; i<reqs.size(); i++) {
        int start = reqs[i][0];
        int end = reqs[i][1];
        int types = reqs[i][2] - 1;
        
        int min_end_time = INT_MAX;
        int min_idx;
        
        for (int j=0; j<times[types].size(); j++) {
            if (min_end_time > times[types][j]) {
                min_end_time = times[types][j];
                min_idx = j;
            }
        }
        
        if (min_end_time <= start) {
            times[types][min_idx] = start + end;
        } else {
            times[types][min_idx] = min_end_time + end;
            
            delay_time += (min_end_time) - start;
        }
    }
    
    if (delay_time < min_time) {
        min_time = delay_time;
    }
    
    return;
}

void dfs(int k, int depth, int remain_mentors, vector<int>& current_mentors, int& min_time, vector<vector<int>>& reqs) {
    if (depth == k) {
        calculate_time(current_mentors, min_time, reqs);
        
        return;
    }

    if (depth == k - 1) {
        current_mentors.push_back(remain_mentors);
        dfs(k, depth+1, 0, current_mentors, min_time, reqs);
        current_mentors.pop_back();
    } else {
        for (int i=1; i<=remain_mentors - (k - depth-1); i++) {
            current_mentors.push_back(i);
            dfs(k, depth+1, remain_mentors - i, current_mentors, min_time, reqs);
            current_mentors.pop_back();
        }
    }
}

int solution(int k, int n, vector<vector<int>> reqs) {
    int min_time = INT_MAX;
    
    vector<int> current_mentors;
    dfs(k, 0, n, current_mentors, min_time, reqs);
    
    return min_time;
}