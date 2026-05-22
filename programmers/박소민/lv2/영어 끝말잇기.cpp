#include <string>
#include <vector>
#include <unordered_set>

using namespace std;

vector<int> solution(int n, vector<string> words) {
    if (words.empty()) return {0, 0};
    
    unordered_set<string> seen_words;
    
    seen_words.reserve(words.size());
    seen_words.insert(words[0]);
    
    for (int i=1; i<words.size(); i++) {
        const string &curr_word = words[i];
        const string &prev_word = words[i - 1];
        
        if (prev_word.back() != curr_word.front()) {
            return {(i % n) + 1, (i / n) + 1};
        }
        
        auto [it, inserted] = seen_words.insert(curr_word);
        
        if (!inserted) {
            return {(i % n) + 1, (i / n) + 1};
        }
    }
    
    return {0, 0};
}