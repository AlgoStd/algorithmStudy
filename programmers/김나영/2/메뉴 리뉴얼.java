import java.util.*;

class Solution {
    
    static String curString;
    static char[] result;
    static List<String> results = new ArrayList<>();
    static Map<String, Integer> map = new HashMap<>(); // count 별로 만들어서 최대값 리턴
    static List<Map<String, Integer>> mapList = new ArrayList<>();
    
    static void dfs(int depth, int start, int count, int l) {
        if (depth == count) {
            Arrays.sort(result);
            String newString = new String(result);
            results.add(newString);
            return;
        }
        for (int i = start; i < l; i++) {
            result[depth] = curString.charAt(i);
            dfs(depth+1, i+1, count, l);
        }
    }
    
    static void combination(String str, int count) {
        // 조함 생성 메서드
        int l = str.length();
        char[] chars = str.toCharArray();
        Arrays.sort(chars);
        curString = new String(chars);
        result = new char[count];
        results = new ArrayList<>();
        dfs(0,0,count,l);
        for (String result : results) {
            map.put(result, map.getOrDefault(result,0)+1);
        }
    }
    public String[] solution(String[] orders, int[] course) {
        List<String> result = new ArrayList<>();
        for (int c : course) {
            map = new HashMap<>();
            for (String order : orders) {
                combination(order, c);
            }
            int max = 0;
            for (int v : map.values()) {
                max = Math.max(max,v);
            }
        
            if (max > 1) {
                for (String str : map.keySet()) {
                    if (map.get(str) == max) {
                        result.add(str);
                    }
                }
            }
        }
        
        Collections.sort(result);
        
        String[] answer = new String[result.size()];
        for (int i = 0; i < result.size(); i++) {
            answer[i] = result.get(i);
        }
        return answer;
    }
}
