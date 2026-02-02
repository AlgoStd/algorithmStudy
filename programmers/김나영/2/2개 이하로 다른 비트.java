/*
그리디하게 풀었는데 실패
탐색해서 가장 작은거 뽑아야 하나? 어떤 경우를 놓친 건지 모르겠음
2-> 10
3 -> 11 -> 101

10101 -> 10110
11110 -> 11111
*/
import java.util.*;
class Solution {
    public long[] solution(long[] numbers) {
        int l = numbers.length;
        long[] answer = new long[l];
        for (int i = 0; i < l; i++) {
            long a = numbers[i];
            String binaryString = Long.toBinaryString(a);
            int s = binaryString.length();
            String newBinaryString = "1";
            // 일단 기존 자릿수에서 탐색
            if (binaryString.contains("0")) {
                for (int j = s-1; j >= 0; j--) {
                    // 뒤에부터 탐색
                    if (binaryString.charAt(j) == '0') {
                        if (j == s-1) {
                            // 마지막 자리면
                            newBinaryString = binaryString.substring(0,j) + "1";
                            break;
                        }
                        else {
                            // 10101 -> 10110
                            // 1011 -> 1101
                            
                            // 101111 -> 110111
                            newBinaryString = binaryString.substring(0,j) + "10" + binaryString.substring(j+2);
                            break;
                        }
                    }
                }
            } else {
                // 기존 자릿수에서 못바꿈
                newBinaryString = "10" + binaryString.substring(1);
            }
            answer[i] = Long.parseLong(newBinaryString, 2);
        }
        return answer;
    }
}
