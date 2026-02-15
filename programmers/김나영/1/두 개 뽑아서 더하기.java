import java.util.*;

class Solution {
    public int[] solution(int[] numbers) {
        Set<Integer> answer = new HashSet<>();
        for (int i = 0; i < numbers.length; i++) {
            for (int j = i+1; j < numbers.length; j++) {
                if (i != j) {
                    int num = numbers[i]+numbers[j];
                    if (!answer.contains(num)) answer.add(num);
                }
            }
        }
        
        List<Integer> answerList = new ArrayList<>(answer);
        Collections.sort(answerList);
        return answerList.stream().mapToInt(Integer::intValue).toArray();
    }
}
