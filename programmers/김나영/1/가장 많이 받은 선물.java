import java.util.*;

class Solution {
    public int solution(String[] friends, String[] gifts) {
        int n = friends.length;
        int[] nextGiftCount = new int[n];
        
        List<String> friendsList = List.of(friends);
        
        int[] giftCount = new int[n]; // 선물 지수
        int[][] graph = new int[n][n]; // 선물 주고받은 내역
        for (String gift : gifts) {
            String[] giftFriends = gift.trim().split(" ");
            int to = friendsList.indexOf(giftFriends[0]);
            int from = friendsList.indexOf(giftFriends[1]);
            graph[to][from] += 1;
            giftCount[to] += 1;
            giftCount[from] -= 1;
        }
        
        // 다음 달에 받을 선물 수 계산
        for (int i = 0; i < n; i++) {
            for (int j = i+1; j < n; j++) {
                if (graph[i][j] > graph[j][i]) {
                    nextGiftCount[i] += 1;
                }
                else if (graph[j][i] > graph[i][j]) {
                    nextGiftCount[j] += 1;
                }
                else {
                    if (giftCount[i] > giftCount[j]) {
                        nextGiftCount[i] += 1;
                    }
                    else if (giftCount[j] > giftCount[i]) {
                        nextGiftCount[j] += 1;
                    }
                }
            }
        }
        
        int answer = 0;
        
        for (int i = 0; i < n; i++) {
            answer = Math.max(answer, nextGiftCount[i]);
        }
        
        return answer;
    }
}