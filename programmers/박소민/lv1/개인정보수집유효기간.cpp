#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

int get_day(string day) {
    return stoi(day.substr(0, 4)) * 12 * 28 + stoi(day.substr(5, 2)) * 28 + stoi(day.substr(8, 2));
}

vector<int> solution(string today, vector<string> terms, vector<string> privacies) {
    vector<int> answer;
    int today_int = get_day(today);
    unordered_map<char, int> term;
    
    for (int i=0; i<terms.size(); i++) {
        string type = terms[i];
        term.insert({type[0], stoi(type.substr(2))});
    }
    
    for (int i=0; i<privacies.size(); i++) {
        int day = get_day(privacies[i].substr(0, 10));
        char type = privacies[i][11];
        
        int month = term[type];
        
        if (today_int >= day + month * 28) {
            answer.push_back(i+1);
        }
    }
    
    return answer;
}