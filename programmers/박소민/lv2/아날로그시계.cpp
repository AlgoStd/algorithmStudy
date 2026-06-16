#include <string>
#include <vector>

using namespace std;

/*
설계 - 만나는 시간
시계 한바퀴의 길이를 l, a시간, b분, c초라고 가정.

1) 시침의 속도
l/(12*60*60)
2) 분침의 속도
l/(60*60)
3) 초침의 속도
l/(60)

따라서 현재 위치와 t초 후의 시침, 분침, 초침의 거리를 구하면
1) 시침 : l*a/(12) + l*t/(12*60*60)
2) 분침 : l*b/(60) + l*t/(60*60)
3) 초침 : l*c/(60) + l*t/60

따라서 초침을 기준으로
1. 초침 > 시침 <-> 초침 < 시침 (바뀐다면 count++)
2. 초침 > 분침 <-> 초침 < 분침 (바귄다면 count++)
3. 초침 = 시침 = 분침 (1)=2)으로 놓고 계산하면 12시00분00초에만 만남)

정답 = 1. + 2. + - 3.
*/

int solution(int h1, int m1, int s1, int h2, int m2, int s2) {
    int answer = 0;
    
    int MOD = 12 * 60 * 60;
    
    // 1. 1초당 가는 거리
    int d_s = 1 * 12 * 60;
    int d_m = 1 * 12;
    int d_h = 1;
    
    // 2. 시작 위치
    int start_s = s1 * 12 * 60;
    int start_m = m1 * 12 * 60 + s1 * d_m;
    int start_h = (h1 % 12) * 60 * 60 + (m1 * 60 + s1) * d_h;
    
    // 3, 시작 시간과 끝 시간
    int start_time = h1 * 60 * 60 + m1 * 60 + s1;
    int end_time = h2 * 60 * 60 + m2 * 60 + s2;
    
    int t = 0;
    
    // 엣지케이스 (시침, 분침, 초침이 모두 만나는 경우 00시, 12시)
    // 중복 되므로 미리 빼준다.
    if ((h1 == 0 || h1 == 12) && m1 == 0 && s1 == 0) {
        answer++;
    }
    
    while (start_time + t < end_time) {        
        // 1) 1초 전의 시침, 초침, 분침
        int curr_h = (start_h + d_h * t) % MOD;
        int curr_m = (start_m + d_m * t) % MOD;
        int curr_s = (start_s + d_s * t) % MOD;
    
        // 2) 1초 후의 시침, 초침, 분침
        int next_h = curr_h + d_h;
        int next_m = curr_m + d_m;
        int next_s = curr_s + d_s;
        
        // 3) 1초 전후의 초침과 시침, 초침과 분침 대소 비교
        bool cross_hs = curr_h > curr_s && next_h <= next_s;
        bool cross_ms = curr_m > curr_s && next_m <= next_s;
        
        if (cross_hs) answer++;
        if (cross_ms) answer++;
        
        // 4) 엣지 케이스 : 시침, 초침, 분침이 모두 만나는 경우 answer--
        if (next_h == MOD && next_m == MOD && next_s == MOD) {
            answer--;
        }
        
        // 5) 1초 갱신
        t++;
    }
    
    return answer;
}