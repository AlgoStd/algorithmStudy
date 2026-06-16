#include <string>
#include <vector>

using namespace std;

int convertToDays(const string& dateStr) {
    int year = stoi(dateStr.substr(0, 4));
    int month = stoi(dateStr.substr(5, 2));
    int day = stoi(dateStr.substr(8, 2));
    
    return year * 12 * 28 + month * 28 + day;
}

vector<int> solution(string today, vector<string> terms, vector<string> privacies) {
    vector<int> answer;
    int todayDays = convertToDays(today);
    
    int termMap[26] = {0};
    
    for (const string& term : terms) {
        char type = term[0];
        int durationMonths = stoi(term.substr(2));
        termMap[type - 'A'] = durationMonths * 28;
    }
    
    for (int i = 0; i < privacies.size(); i++) {
        int privacyDays = convertToDays(privacies[i].substr(0, 10));
        char type = privacies[i][11];
        
        if (privacyDays + termMap[type - 'A'] <= todayDays) {
            answer.push_back(i + 1);
        }
    }
    
    return answer;
}