import java.util.*;
import java.lang.Math;

class Solution {
    public String solution(int[] numbers, String hand) {
        String answer = "";
        Map<Integer, int[]> map = new HashMap<>();
        
        map.put(1, new int[]{0,0});
        map.put(2, new int[]{0,1});
        map.put(3, new int[]{0,2});
        map.put(4, new int[]{1,0});
        map.put(5, new int[]{1,1});
        map.put(6, new int[]{1,2});
        map.put(7, new int[]{2,0});
        map.put(8, new int[]{2,1});
        map.put(9, new int[]{2,2});
        map.put(0, new int[]{3,1});
        
        int left_y = 3;
        int left_x = 0;
        int right_y = 3;
        int right_x = 2;
        
        for (int num : numbers) {
            int[] spot = map.get(num);
            int umji = 0;
            if (num == 1 || num == 4 || num == 7) umji = -1;
            else if (num == 3 || num == 6 || num == 9) umji = 1;
            else {
                double leftD = Math.abs(left_y - spot[0]) + Math.abs(left_x-spot[1]);
                double rightD = Math.abs(right_y - spot[0]) + Math.abs(right_x - spot[1]);
                if (leftD > rightD) umji = 1;
                else if (rightD > leftD) umji = -1;
                else {
                    if (hand.equals("right")) umji = 1;
                    if (hand.equals("left")) umji = -1;
                }
            }
            if (umji == 1) {
                right_y = spot[0];
                right_x = spot[1];
                answer += "R";
            }
            else if (umji == -1) {
                left_y = spot[0];
                left_x = spot[1];
                answer += "L";
            }
        }
        
        return answer;
    }
}