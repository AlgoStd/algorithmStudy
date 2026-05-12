#include <string>
#include <vector>
#include <iostream>
#include <set>

using namespace std;

vector<int> solution(int n, vector<string> words) {
    int turn = 0;
    char first;
    char last;
    vector<int> answer;
    set<string> S;
    
    for (int i=0; i < words.size(); i++) {
        if (i % n == 0) {
            turn++;
        }
        
        const string &val = words.at(i);
        
        // 1. 앞 뒤가 같은지 확인
        if (i == 0) {
            last = val[val.size()-1];
        } else {
            first = val[0];
            
            if (first != last) {
                answer.push_back(i % n + 1);
                answer.push_back(turn);
                break;
            }
            
            last = val[val.size()-1];
            
        }
        
        // 2. 중복되는지 확인
        if (S.empty() || S.find(val) == S.end()) {
            S.insert(val);
        } else {
            answer.push_back(i % n + 1);
            answer.push_back(turn);
            break;
        }
    }
    
    if (answer.empty()) {
        answer.push_back(0);
        answer.push_back(0);
    }

    return answer;
}