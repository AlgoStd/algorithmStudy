#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int toSeconds(const string& time_str) {
    int m = stoi(time_str.substr(0, 2));
    int s = stoi(time_str.substr(3, 2));
    return m * 60 + s;
}

string toTimeStr(int total_seconds) {
    int m = total_seconds / 60;
    int s = total_seconds % 60;
    
    char buf[6];
    snprintf(buf, sizeof(buf), "%02d:%02d", m, s);
    
    return string(buf);
}

string solution(string video_len, string pos, string op_start, string op_end, vector<string> commands) {
    int video_t = toSeconds(video_len);
    int current_t = toSeconds(pos);
    int op_s = toSeconds(op_start);
    int op_e = toSeconds(op_end);
    
    // 오프닝 구간 건너뛰는 함수 -> 람다
    auto skipOpening = [&](int time) {
        if (time >= op_s && time <= op_e) {
            return op_e;
        }
        return time;
    };
    
    // 초기 위치 오프닝 체크
    current_t = skipOpening(current_t);
    
    for (const string& cmd : commands) {
        if (cmd == "prev") {
            current_t = max(0, current_t - 10);
        } else if (cmd == "next") {
            current_t = min(video_t, current_t + 10);
        }
        
        current_t = skipOpening(current_t);
    }
    
    return toTimeStr(current_t);
}