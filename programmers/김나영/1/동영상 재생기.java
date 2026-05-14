import java.util.*;

class Solution {
    public Integer parseString(String str) {
        return Integer.parseInt(str.substring(0,2)) * 60 + Integer.parseInt(str.substring(3));
    }
    public String solution(String video_len, String pos, String op_start, String op_end, String[] commands) {
        String answer = "";
        int videoLength = parseString(video_len);
        int posInteger = parseString(pos);
        int startInteger = parseString(op_start);
        int endInteger = parseString(op_end);
        int curPos = posInteger;
        
        for (String command : commands) {
            if ((startInteger <= curPos) && (curPos <= endInteger)) {
                curPos = endInteger;
            }
            if (command.equals("prev")) {
                if (curPos < 10) {
                    curPos = 0;
                }
                else {
                    curPos -= 10;
                }
            } else if (command.equals("next")) {
                if (videoLength - curPos < 10) {
                    curPos = videoLength;
                }
                else {
                    curPos += 10;
                }
            }
            if ((startInteger <= curPos) && (curPos <= endInteger)) {
                curPos = endInteger;
            }
            System.out.println(curPos);
        }
        
        int hour = curPos / 60;
        int min = curPos % 60;
        if (hour < 10) {
            answer += "0";
        }
        answer += hour;
        answer += ":";
        if (min < 10) {
            answer += "0";
        }
        answer += min;
        return answer;
    }
}