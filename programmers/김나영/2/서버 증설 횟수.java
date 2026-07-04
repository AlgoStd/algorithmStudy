/*
m명 늘어날 때마다 서버 1대 추가로 필요
n*m명 이상 (n+1)*m명 미만 -> 최소 n대
한 번 증설한 서버는 k시간 동안 운영하고 그 이후에는 반납
*/
import java.util.*;
class Solution {
    
    int totalServer;
    
    class Server {
        int timeLeft;
        
        Server(int k) {
            this.timeLeft = k;
        }
        
        public boolean decreaseTime() {
            this.timeLeft -= 1;
            if (this.timeLeft == 0) {
                return false;
            }
            return true;
        }
    }
    public int solution(int[] players, int m, int k) {
        int answer = 0; // 증설 횟수
        totalServer = 0; // 현재 서버 수
        List<Server> servers = new ArrayList<>();
        
        for (int player : players) {
            // 서버 시간 처리
            Iterator<Server> it = servers.iterator();

            while (it.hasNext()) {
                Server server = it.next();
                boolean alive = server.decreaseTime();

                if (!alive) {
                    it.remove();
                    totalServer--;
                }
            }
            
            int times = player / m;
            if (times > 0) {
                int needServer = times - totalServer;
                if (needServer > 0) {
                    answer += needServer; // 증설
                    while (needServer-- > 0) {
                        Server server = new Server(k);
                        servers.add(server);
                        totalServer++;
                    }
                }
            }
        }
        return answer;
    }
}