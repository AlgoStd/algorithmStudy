class Solution {
    public int solution(int[] bandage, int health, int[][] attacks) {
        int answer = 0;
        int playerHealth = health;
        int time = 0;
        for (int i = 0; i < attacks.length; i++) {
            int attackTime = attacks[i][0];
            int attackHealth = attacks[i][1];
            
            int leftTime = attackTime - time - 1;
            //공격받기 전까지 체력회복 계산
            if (leftTime > 0) {
                int curHealth = playerHealth + leftTime * bandage[1];
                if (attackTime - time > bandage[0]) {
                    // 연속 성공
                    curHealth += (leftTime/bandage[0])*bandage[2];
                }
                
                if (curHealth < health) playerHealth = curHealth;
                else playerHealth = health;
            }
            
            //공격
            playerHealth -= attackHealth;
            time = attackTime;

            if (playerHealth <= 0) {
                return -1;
            }
        }
        return playerHealth;
    }
}
