function solution(info, n, m) {
    const len = info.length;
    
    // len + 1, n
    const dp = Array.from({length: len + 1}, () => Array(n).fill(Infinity));
    
    // 아무것도 고르지 않은 경우 당연히 A의 값도 0
    dp[0][0] = 0;
    
    // info를 모두 순회해야 하므로
    for (let i = 1; i <= len; i++) {
        const [a, b] = info[i-1];
        
        // dp 배열을 순회하면서 이전 값을 갱신
        for (let j = 0; j < n; j++) {
            // 이전 것이 없다 -> 없다.
            if (dp[i-1][j] === Infinity) continue;
            
            const prevB = dp[i - 1][j];
            
            // b가 훔치는 경우
            if (prevB + b < m) {
                dp[i][j] = Math.min(prevB + b, dp[i][j]);
            }
            
            // a가 훔치는 경우
            if (j + a < n) {
                dp[i][j + a] = Math.min(prevB, dp[i][j + a]);
            }
        }
    }
    
    let answer = Infinity;
    
    for (let i = 0; i < n; i++) {
        if (dp[len][i] < m) {
            answer = Math.min(answer, i);
        }
    }
    
    return answer === Infinity ? -1 : answer;
}