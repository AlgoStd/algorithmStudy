/*
그리디
배달과 수거가 남은 가장 먼 곳 찾아서 남아있을 때까지 왔다갔다하기
*/
class Solution {
    public long solution(int cap, int n, int[] deliveries, int[] pickups) {
        long answer = 0;
        int d = n - 1;
        int p = n - 1;
        
        while (d >= 0 || p >= 0) {
            // 가장 먼 배달 남은 곳 찾기
            // 배달할 거 없으면 다음 집으로
            while (d >= 0 && deliveries[d] == 0) { 
                d--;
            }

            // 가장 먼 수거 남은 곳 찾기
            while (p >= 0 && pickups[p] == 0) {
                p--;
            }
            
            if (d == -1 && p == -1) {
                break;
            }

            int spot = Math.max(d, p); // 가장 먼 곳 찾기
            int distance = (spot + 1) * 2; // 거리
            answer += distance;

            // 배달
            int capacity = cap;
            while (d >= 0 && capacity > 0) {
                if (deliveries[d] <= capacity) { // 다 배달 가능
                    capacity -= deliveries[d];
                    deliveries[d] = 0;
                    d -= 1;
                }
                else { // 남은 수용 가능 용량만큼 배달
                    deliveries[d] -= capacity;
                    capacity = 0;
                }
            }

            // 수거
            capacity = cap;
            while (p >= 0 && capacity > 0) {
                if (pickups[p] <= capacity) {
                    capacity -= pickups[p];
                    pickups[p] = 0;
                    p -= 1;
                }
                else {
                    pickups[p] -= capacity;
                    capacity = 0;
                }
            }
        }
        
        
        
        return answer;
    }
}