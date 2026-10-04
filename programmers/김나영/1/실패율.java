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

// 또 다른 풀이
import java.util.*;

class Solution {
    public int[] solution(int N, int[] stages) {
        int[] answer = new int[N];
        
        int[] notCleared = new int[N];
        int[] onStage = new int[N];
        for (int stage : stages) {
            for (int i = 1; i <= stage && i <= N; i++) {
                onStage[i-1]++;
            }
            if (stage <= N) {
                notCleared[stage-1]++;
            }
        }
        
        Integer[] stagesNum = new Integer[N];
        
        for (int i = 0; i < N; i++) {
            stagesNum[i] = i;
        }
        
        Arrays.sort(stagesNum, (a,b) -> {
            // 실패율 계산
            double failureA = (onStage[a] == 0) ? 0 : (double) notCleared[a] / onStage[a];
            double failureB = (onStage[b] == 0) ? 0 : (double) notCleared[b] / onStage[b];
            
            if (failureA == failureB) { // 번호 오름차순
                return a-b;
            }
            return Double.compare(failureB, failureA); // 실패율 정렬 내림차순
            
        });
        
        for (int i = 0; i < N; i++) {
            answer[i] = stagesNum[i] + 1;
        }
        
        return answer;
    }
}
