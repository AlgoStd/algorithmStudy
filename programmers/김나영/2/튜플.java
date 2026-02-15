import java.util.*;

class Solution {

    public int[] solution(String s) {
        String newS = s.substring(2,s.length()-2);
        String[] strings = newS.split("\\},\\{");
        
        Arrays.sort(strings, (a,b) -> a.split(",").length - b.split(",").length);
        
        int[] answer = new int[strings.length];
        Set<Integer> set = new HashSet<>();
        int idx = 0;
        for (String string : strings) {
            for (String num : string.split(",")) {
                int x = Integer.parseInt(num);
                if (!set.contains(x)) {
                    set.add(x);
                    answer[idx++] = x;
                }
            }
        }
        return answer;
    }
}
