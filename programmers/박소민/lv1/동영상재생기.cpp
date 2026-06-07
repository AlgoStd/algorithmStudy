#include <string>
#include <vector>

using namespace std;

// prev 10초 전으로 이동
// next 10초 후로 이동
// 오프닝 구간 - 오프닝 건너뛰기

string solution(string video_len, string pos, string op_start, string op_end, vector<string> commands) {
    string answer = "";
    int current_t = stoi(pos.substr(0, 2)) * 60 + stoi(pos.substr(3));
    int start_t = stoi(op_start.substr(0, 2)) * 60 + stoi(op_start.substr(3));
    int end_t = stoi(op_end.substr(0, 2)) * 60 + stoi(op_end.substr(3));
    int video_l = stoi(video_len.substr(0, 2)) * 60 + stoi(video_len.substr(3));
    
    if (current_t >= start_t && current_t <= end_t) {
        current_t = end_t;
    }
    
    for (int i=0; i<commands.size(); i++) {
        string &val = commands[i];
        
        if (val == "prev") {
            current_t -= 10;
        } else if (val == "next") {
            current_t += 10;
        }
        
        if (current_t < 0) {
            current_t = 0;
        } else if (current_t > video_l) {
            current_t = video_l;
        }
        
        if (current_t >= start_t && current_t <= end_t) {
            current_t = end_t;
        }
    }
    
    string min = to_string(current_t / 60);
    string sec = to_string(current_t % 60);
    
    if (min.size() == 1) {
        answer += "0" + min + ":";
    } else {
        answer += min + ":";
    }
    
    if (sec.size() == 1) {
        answer += "0" + sec;
    } else {
        answer += sec;
    }
    
    return answer;
}