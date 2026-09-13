import java.util.*;

class Solution {
    public String[] solution(String[] strings, int n) {
        Arrays.sort(strings, (a,b) -> {
            // n번째 문자 기준 정렬
            if (a.charAt(n) != b.charAt(n)) {
                return a.charAt(n) - b.charAt(n);
            }
            // n번째 문자가 같으면 사전순
            return a.compareTo(b);
        });
        return strings;
    }
}