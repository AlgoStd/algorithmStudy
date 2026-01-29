import java.util.*;

class Solution {
    public int[] solution(int N, int[] stages) {
        float[] wrong = new float[N];
        float[] count = new float[N];
        int total_people = 0;
        for (int stage : stages) {
            total_people++;
            if (stage > N) continue;
            count[stage-1]++;
        }
        for (int i = 0; i < N; i++) {
            float c = count[i];
            if (c == 0) {
                wrong[i] = 0;
                continue;
            }
            wrong[i] = c / total_people;
            total_people -= c;
        }
        Integer[] idx = new Integer[N];
        for (int i = 0; i < N; i++) idx[i] = i;
        Arrays.sort(idx, (a,b) ->
                   wrong[a] == wrong[b] ? a-b : Float.compare(wrong[b], wrong[a]));
        
        int[] answer = new int[N];
        for (int i = 0; i < N; i++) {
            answer[i] = idx[i]+1;
        }
        return answer;
    }
}
