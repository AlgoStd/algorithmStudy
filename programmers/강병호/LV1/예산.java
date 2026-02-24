import java.util.*;

class Solution {

    public int solution(int[] d, int budget) {

        // input 
        // d : 신청 금액 (부서 : index)
        // budget : 현재 예산
        
        /* solve
        - 최소 지정 금액 지원
        - 최대한 많은 부서에 지원 -> 가장 작은 것들 기준으로 제공 -> 오름차순 sort 후 금액 차감
        - 길이 : 100 / 금액 :100_000 O(N)
        
        */
        int answer = 0;

        Arrays.sort(d);
        for (int i = 0; i < d.length; i++) {
            budget -= d[i];

            if (budget >= 0) answer++;
            else break;
        }

        // output : 최대 지원 가능 부서 수
        return answer;
    }
}