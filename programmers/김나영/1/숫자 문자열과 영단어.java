import java.util.*;

class Solution {
    public int solution(String s) {
        int answer = 0;
        Map<String, Integer> map = new HashMap<>();
        map.put("zero", 0);
        map.put("one", 1);
        map.put("two", 2);
        map.put("three", 3);
        map.put("four", 4);
        map.put("five", 5);
        map.put("six", 6);
        map.put("seven", 7);
        map.put("eight", 8);
        map.put("nine", 9);
        
        int l = s.length();
        int start = 0;
        int end = start + 1;
        while (start < end && end < l+1 && start < l) {
            char curChar = s.charAt(start);
            if (Character.isDigit(curChar)) {
                answer = answer * 10 + (curChar - '0');
                start = end;
                end = start + 1;
                continue;
            }
            String substr = s.substring(start, end);
            if (map.keySet().contains(substr)) {
                answer = answer * 10 + map.get(substr);
                start = end;
                end = start + 1;
                continue;
            }
            end++;
        }
        return answer;
    }
}