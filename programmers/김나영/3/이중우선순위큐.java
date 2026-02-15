import java.util.*;

class Solution {
    public int[] solution(String[] operations) {
        int[] answer = new int[2]; // 최댓값, 최솟값
        PriorityQueue<Integer> minpq = new PriorityQueue<>();
        PriorityQueue<Integer> maxpq = new PriorityQueue<>(Collections.reverseOrder());
        for (String operation : operations) {
            char op = operation.charAt(0);
            Integer num = Integer.parseInt(operation.substring(2));
            if (op == 'I') {
                minpq.add(num);
                maxpq.add(num);
            } else if (op == 'D') {
                if (num == 1 && maxpq.size() > 0) { // 최댓값 삭제
                    int max = maxpq.poll();
                    minpq.remove(max);
                } else if (num == -1 && minpq.size() > 0) { // 최솟값 삭제
                    int min = minpq.poll();
                    maxpq.remove(min);
                }
            }
        }
        if (maxpq.size() > 0) answer[0] = maxpq.poll();
        else answer[0] = 0;
        
        if (minpq.size() > 0) answer[1] = minpq.poll();
        else answer[1] = 0;
        
        return answer;
    }
}
