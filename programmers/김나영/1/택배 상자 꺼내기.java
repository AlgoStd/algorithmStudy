class Solution {
    public int solution(int n, int w, int num) {
        int answer = 1;
        int curHeight = num / w; 
        int curLeft = num % w;
        int totalHeight = n / w; 
        int totalLeft = n % w; 
        if (curLeft == 0) curLeft = w;
        else curHeight += 1;
        
        if (totalLeft == 0) totalLeft = w;
        else totalHeight += 1;
        
        if (curHeight < totalHeight) answer += (totalHeight - curHeight - 1);
        
        int curIndex = 0;
        if (curHeight % 2 == 0) { // 짝수 층
            curIndex = w-curLeft;
        }
        else curIndex = curLeft - 1;
        
        if (curHeight < totalHeight) {
            if (totalHeight % 2 == 1) {
                if (curIndex <= totalLeft - 1) answer += 1;
            }
            else {
                if (curIndex >= w - totalLeft) answer += 1;
            }
        }
        
        return answer;
    }
}