/*
설계
빡 구현처럼 보인다.
최소 소비 전력
50 * 1000 * 2^1000 (에어컨 키고 끄는 경우)
-> 완전 탐색 안됨

그렇다면 dp!
시간을 기준으로 한 dp

51 * 1000 * 50 (모든 온도 * onboard의 크기 * t1 ~ t2)
*/

function solution(temperature, t1, t2, a, b, onboard) {
    const n = onboard.length;
    const offset = 10;
    
    // 인덱스 혼동을 위해 미리 보정
    const nt = temperature + offset;
    const nt1 = t1 + offset;
    const nt2 = t2 + offset;
    
    // 시간을 기준으로 dp를 선언 
    // (0 ~ n-1까지니까 배열 길이 = n)
    // 수정 -> 시간, "실내"온도를 기준으로 dp 선언
    const dp = Array.from({length : n}, () => Array(51).fill(Infinity) );
    
    dp[0][nt] = 0;
    
    // 승객 탑승을 기준으로 순회
    for (let i = 1; i < n; i++) {        
        // 이전 시간을 기준으로 -1, 0, 1로 현재 시간에 따른 실내온도 측정
        // 온도를 1도씩 올리면서 순회
        for (let j = 0; j <= 50; j++) {
            // 예외 처리 - 사람 탑승 && 조건에 맞지 않는 온도 -> continue
            // Q1 : Infinity 처리 안 해도 되는가?
            if (onboard[i] === 1 && (nt1 > j || nt2 < j)) continue;
            
            // 1. 이전 온도 === 현재 온도 (유지되는 경우)
            if (dp[i-1][j] !== Infinity) {
                // 1) 에어컨 끈 경우 - 실외온도 === 실내온도
                if (j === nt) {
                    dp[i][j] = Math.min(dp[i][j], dp[i-1][j]);
                }
                
                // 2) 에어컨을 킨 경우 (실내온도 === 희망온도)
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j] + b);
            }
            
            // 2. 이전 온도 === 현재 온도 - 1 (온도가 낮아짐)
            if (j+1 <= 50 && dp[i-1][j+1] !== Infinity) {
                // 1) 에어컨 끈 경우 (실내온도 > 실외온도)
                if (j+1 > nt) {
                    dp[i][j] = Math.min(dp[i][j], dp[i-1][j+1]);
                }
                
                // 2) 에어컨을 킨 경우 (실내온도 < 희망온도)
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j+1] + a);
            }
            
            // 3. 이전 온도 === 현재 온도 + 1 (온도가 높아짐)
            if (j-1 >= 0 && dp[i-1][j-1] !== Infinity) {
                // 1) 에어컨 끈 경우 (실내온도 < 실외온도 )
                if (j-1 < nt) {
                    dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1]);
                }
                
                // 2) 에어컨을 킨 경우 (실내온도 < 희망온도)
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j-1] + a);
            }
        }
    }
    
    return Math.min(...dp[n-1]);
}