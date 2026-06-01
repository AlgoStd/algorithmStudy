class Solution {
    public String solution(int[] food) {
        String answer = "";
        int water = 1;
        for (int i = 1; i < food.length; i++) {
            int count = food[i] / 2;
            for (int j = 0; j < count; j++) {
                answer += i;
            }
        }
        StringBuffer sb = new StringBuffer(answer);
        String answerFlip = sb.reverse().toString();
        answer += "0";
        answer += answerFlip;
        return answer;
    }
}