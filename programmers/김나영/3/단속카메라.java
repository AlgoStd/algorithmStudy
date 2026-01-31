import java.util.*;

class Solution {
    public int solution(int[][] routes) {
        // 두 번째 값 (나간 시점) 기준으로 오름차순 정렬
        Arrays.sort(routes, Comparator.comparingInt(a -> a[1]));
        
        int answer = 1;
        int end = routes[0][1]; // 첫 번째 차량의 나간 시점을 기준으로 시작
        
        for (int i = 1; i < routes.length; i++) {
            // 현재 차량의 진입 시점이 이전 카메라의 범위를 벗어나면 새 카메라 필요
            if (routes[i][0] > end) {
                answer++;
                end = routes[i][1];
            }
        }
        
        return answer;
    }
}
