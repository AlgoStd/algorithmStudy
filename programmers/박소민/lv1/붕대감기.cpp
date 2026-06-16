#include <string>
#include <vector>

using namespace std;

/*
설계
시뮬레이션
기본적인 상태와 값들이 주어지고
attacks 배열을 순회하면서 상태를 변화하기 때문.
*/

int solution(vector<int> bandage, int health, vector<vector<int>> attacks) {
    int curr_health = health;
    int t = bandage[0];
    int x = bandage[1];
    int y = bandage[2];
    
    int curr_time = 1;
    int recover_time = 0;
    
    for (auto& attack : attacks) {
        int attack_time = attack[0];
        int attack_amount = attack[1];
        
        // 1. 공격 시간 전까지 체력 회복
        recover_time = (attack_time - curr_time);
        curr_health += (recover_time * x);
        
        if (recover_time >= t) {
            curr_health += (recover_time / t) * y;
        }
        
        curr_time = attack_time + 1;
        
        if (curr_health >= health) {
            curr_health = health;
        }
        
        curr_health -= attack_amount;
        
        if (curr_health <= 0) {
            return -1;
        }
    }
    
    return curr_health;
}