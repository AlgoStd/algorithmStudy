import java.util.*;

class Solution {
    public int[] solution(String[] info, String[] query) {
        int len = query.length;
        int[] answer = new int[len];
        
        Map<String, List<Integer>> map = new HashMap<>();
        
        // 빠른 검색을 위한 info map에 저장
        for (String in : info) {
            String[] a = in.split(" ");
            int score = Integer.parseInt(a[4]);
            
            String[] lang = {a[0], "-"};
            String[] job = {a[1], "-"};
            String[] career = {a[2], "-"};
            String[] food = {a[3], "-"};
            
            // 모든 조합으로 저장
            for (String l : lang) {
                for (String j : job) {
                    for (String c : career) {
                        for (String f : food) {
                            String key = l + j + c + f;
                            map.putIfAbsent(key, new ArrayList<>());
                            map.get(key).add(score);
                        }
                    }
                }
            }
        }
        
        // 점수 정렬 후 이진 탐색
        for (List<Integer> scores : map.values()) {
            Collections.sort(scores);
        }
        
        // 검색
        for (int i = 0; i < len; i++) {
            String[] q = query[i].split(" ");
            String key = q[0] + q[2] + q[4] + q[6]; // and 제외 key 조합
            int score = Integer.parseInt(q[7]);
            List<Integer> scores = map.get(key);
            
            if (scores == null) {
                answer[i] = 0;
                continue;
            }
            
            int left = 0;
            int right = scores.size();
            
            while (left < right) {
                int mid = (left + right) / 2;
                if (scores.get(mid) >= score) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            answer[i] = scores.size() - left;
        }
        
        return answer;
    }
}