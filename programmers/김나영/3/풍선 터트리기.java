/*
dfs 백트래킹 -> 시간초과
나보다 작은 숫자가 왼쪽과 오른쪽에 모두 있으면 살아남을 수 없다
왼쪽, 오른쪽 검색하며 현재 풍선이 살아남을 수 있는지 체크
*/

import java.util.*;

class Solution {
    public int solution(int[] a) {
        int answer = 0;
        int l = a.length;
        
        int min_left = 1000000000;
        int min_right = 1000000000;
        
        boolean[] survive = new boolean[l];
        
        // 왼쪽 검색
        for (int i = 0; i < l; i++) {
            if (a[i] < min_left) {
                survive[i] = true;
                min_left = a[i];
            }
        }
        
        // 오른쪽 검색
        for (int i = l - 1; i >= 0; i--) {
            if (a[i] < min_right) {
                survive[i] = true;
                min_right = a[i];
            }
        }
        
        for (boolean b : survive) {
            if (b) { answer++; }
        }
        
        return answer;
    }
}