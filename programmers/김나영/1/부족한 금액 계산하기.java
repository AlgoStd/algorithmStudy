class Solution {
    public long solution(int price, int money, int count) {
        long answer = -1;
        long totalMoney = 0;
        int prvPrice = price;
        for (int i = 0; i < count; i++) {
            totalMoney += prvPrice;
            prvPrice += price;
        }
        answer = totalMoney - money;
        if (answer >= 0) {
            return answer;
        }
        else return 0;
    }
}