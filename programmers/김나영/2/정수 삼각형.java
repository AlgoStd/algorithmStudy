class Solution {
    public int solution(int[][] triangle) {
        int answer = 0;
        int n = triangle.length;
        int m = triangle[0].length;
        int[][] dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[i+1];
        }
        dp[0][0] = triangle[0][0];
        for (int i = 1; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                if (j == 0) {
                    // 왼쪽 끝
                    dp[i][j] = triangle[i][j] + dp[i-1][j];
                } else if (j == i) {
                    // 오른쪽 끝
                    dp[i][j] = triangle[i][j] + dp[i-1][j-1];
                } else {
                    dp[i][j] = triangle[i][j] + Math.max(dp[i-1][j], dp[i-1][j-1]);
                }
            }
        }
        
        for (int a : dp[n-1]) {
            answer = Math.max(a,answer);
        }
        return answer;
    }
}