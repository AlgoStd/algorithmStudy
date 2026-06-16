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

constexpr int SECONDS_PER_MINUTE = 60;
constexpr int MINUTES_PER_HOUR = 60;
constexpr int HOURS_PER_HALF_DAY = 12;
constexpr int HALF_DAY_SECONDS = HOURS_PER_HALF_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;

int solution(int h1, int m1, int s1, int h2, int m2, int s2) {
    int answer = 0;
    
    // 1. 1초당 가는 거리
    constexpr int d_h = 1;
    constexpr int d_m = 1 * 12;
    constexpr int d_s = 1 * 12 * 60;
    
    // 2. 시작 시간과 끝 시간
    const int start_time = h1 * 60 * 60 + m1 * 60 + s1;
    const int end_time = h2 * 60 * 60 + m2 * 60 + s2;
    
    // 2. 시작 위치
    int start_s = s1 * d_s;
    int start_m = (m1 * 60 + s1) * d_m;
    int start_h = ((h1 % 12) * 60 * 60 + m1 * 60 + s1) * d_h;
    
    // 엣지케이스 (시침, 분침, 초침이 모두 만나는 경우 00시, 12시)
    // 미리 더해준다.
    if (start_time == 0 || start_time == HALF_DAY_SECONDS) {
        answer++;
    }
    
    for (int t = 0; start_time + t < end_time; ++t) {        
        // 1) 1초 전의 시침, 초침, 분침
        const int curr_h = (start_h + d_h * t) % HALF_DAY_SECONDS;
        const int curr_m = (start_m + d_m * t) % HALF_DAY_SECONDS;
        const int curr_s = (start_s + d_s * t) % HALF_DAY_SECONDS;
    
        // 2) 1초 후의 시침, 초침, 분침
        const int next_h = curr_h + d_h;
        const int next_m = curr_m + d_m;
        const int next_s = curr_s + d_s;
        
        // 3) 1초 전후의 초침과 시침, 초침과 분침 대소 비교
        const bool cross_hs = curr_h > curr_s && next_h <= next_s;
        const bool cross_ms = curr_m > curr_s && next_m <= next_s;
        
        if (cross_hs) answer++;
        if (cross_ms) answer++;
        
        // 4) 엣지 케이스 : 시침, 초침, 분침이 모두 만나는 경우 answer--
        if (next_h == HALF_DAY_SECONDS && next_m == HALF_DAY_SECONDS && next_s == HALF_DAY_SECONDS) {
            answer--;
        }
    }
    
    return answer;
}