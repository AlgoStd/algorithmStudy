class Solution {
    int n;
    int m;
    boolean[][] visited;
    int[][] users;
    int[] emoticons;
    
    int maxSubscriber;
    int maxAmount;
    
    public void dfs(int[] percentages, int depth) {
        if (depth == m) {
            int totalAmount = 0;
            int subscriber = 0;
            for (int[] user : users) {
                int amount = 0;
                for (int i = 0; i < m; i++) {
                    int per = percentages[i];
                    if (per >= user[0]) {
                        // 이모티콘 구매
                        amount += emoticons[i] * (100 - per) / 100;
                    }
                }
                if (amount >= user[1]) {
                    subscriber++; // 플러스 가입
                } else {
                    totalAmount += amount;
                }
            }
            if (subscriber > maxSubscriber) {
                maxSubscriber = subscriber;
                maxAmount = totalAmount;
            } else if (subscriber == maxSubscriber) {
                maxAmount = Math.max(maxAmount, totalAmount);
            }
            return;
        }
        
        for (int per = 10; per <= 40; per += 10) {
            percentages[depth] = per;
            dfs(percentages, depth+1);
        }
    }
    
    public int[] solution(int[][] users, int[] emoticons) {
        n = users.length;
        m = emoticons.length;
        this.users = users;
        this.emoticons = emoticons;
        int minPercent = 100;
        
        int[] percentages = new int[m];
        dfs(percentages,0);
        
        return new int[]{maxSubscriber, maxAmount};
    }
}