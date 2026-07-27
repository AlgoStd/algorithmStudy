#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int get_idx(string s) {
    if (s == "code") return 0;
    if (s == "date") return 1;
    if (s == "maximum") return 2;
    return 3;
}

vector<vector<int>> solution(vector<vector<int>> data, string ext, int val_ext, string sort_by) {
    vector<vector<int>> answer;
    
    int target_idx = get_idx(ext);
    int sort_idx = get_idx(sort_by);
    
    for (int i = 0; i < data.size(); i++) {
        if (data[i][target_idx] < val_ext) {
            answer.push_back(data[i]);
        }
    }
    
     sort(answer.begin(), answer.end(), [sort_idx](const vector<int>& a, const vector<int>& b){
         return a[sort_idx] < b[sort_idx];
     });
    
    return answer;
}