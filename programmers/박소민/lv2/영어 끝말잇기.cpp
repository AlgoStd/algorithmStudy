#include <string>
#include <vector>
#include <unordered_set>

using namespace std;

vector<int> solution(int n, vector<string> words) {
    unordered_set<string> seen_words;
    
    seen_words.insert(words[0]);
    
    for (int i=1; i<words.size(); i++) {
        const string &curr_word = words[i];
        const string &prev_word = words[i - 1];
        
        if (prev_word.back() != curr_word.front()
           || seen_words.find(curr_word) != seen_words.end()) {
            int person = (i%n) +1;
            int turn = (i/n)+1;
            return {person, turn};
        }
        
        seen_words.insert(curr_word);
    }
    
    return {0, 0};
}