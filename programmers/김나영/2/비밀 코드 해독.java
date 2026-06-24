class Solution {
    
    int answer = 0;
    int n;
    int k;
    int[][] q;
    int[] ans;
    
    // 조합 만들기
    public void dfs(int start, int depth, int[] code) {
        if (depth == 5) {
            if (isValid(code)) {
                answer++;
            }
            return;
        }
        for (int num = start; num <= n; num++) {
            code[depth] = num;
            dfs(num+1, depth+1, code);
        }
    }
    
    // 비밀 코드 가능한지 검사
    public boolean isValid(int[] code) {
        for (int i = 0; i < k; i++) {
            int cnt = 0;
            int[] currentQ = q[i];
            for (int a : code) {
                for (int b : currentQ) {
                    if (a == b) {
                        cnt++;
                        break;
                    }
                }
            }
            if (cnt != ans[i]) {
                return false;
            }
        }
        return true;
    }
    
    public int solution(int n, int[][] q, int[] ans) {
        k = ans.length;
        this.n = n;
        this.q = q;
        this.ans = ans;
        
        dfs(1, 0, new int[5]);
        
        return answer;
    }
}