class Solution {
    public int[] solution(int rows, int columns, int[][] queries) {
        int[] answer = new int[queries.length];
        
        // 1. 행렬 초기화
        int[][] graph = new int[rows][columns];
        int start = 1;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                graph[i][j] = start++;
            }
        }
        
        int index = 0;
        for (int[] query : queries) {
            int x1 = query[0] - 1;
            int y1 = query[1] - 1;
            int x2 = query[2] - 1;
            int y2 = query[3] - 1;

            int[][] tmpGraph = new int[rows][columns];
            for (int nx = x1; nx <= x2; nx++) {
                for (int ny = y1; ny <= y2; ny++) {
                    tmpGraph[nx][ny] = graph[nx][ny];
                }
            }
            
            int minNum = rows * columns + 1;
            
            // 2. 직사각형 영역 순회
            for (int nx = x1; nx <= x2; nx++) {
                for (int ny = y1; ny <= y2; ny++) {
                    
                    // 현재 좌표가 테두리인지 먼저 확인 (상, 하, 좌, 우 국경선에 있는 경우만)
                    boolean isBorder = (nx == x1 || nx == x2 || ny == y1 || ny == y2);
                    
                    if (isBorder) {
                        // 테두리일 때만 최솟값 갱신에 참여
                        int curNum = graph[nx][ny];
                        if (curNum < minNum) {
                            minNum = curNum;
                        }
                        // 위쪽 테두리 선인 경우
                        if (nx == x1) {
                            if (ny == y2) tmpGraph[x1 + 1][y2] = graph[nx][ny]; // 우측 상단 모서리는 아래로
                            else tmpGraph[nx][ny + 1] = graph[nx][ny];          // 나머지는 오른쪽으로
                        }
                        // 오른쪽 테두리 선인 경우
                        else if (ny == y2) {
                            if (nx == x2) tmpGraph[x2][y2 - 1] = graph[nx][ny]; // 우측 하단 모서리는 왼쪽으로
                            else tmpGraph[nx + 1][ny] = graph[nx][ny];          // 나머지는 아래로
                        }
                        // 아래쪽 테두리 선인 경우
                        else if (nx == x2) {
                            if (ny == y1) tmpGraph[x2 - 1][y1] = graph[nx][ny]; // 좌측 하단 모서리는 위로
                            else tmpGraph[nx][ny - 1] = graph[nx][ny];          // 나머지는 왼쪽으로
                        }
                        // 왼쪽 테두리 선인 경우
                        else if (ny == y1) {
                            if (nx == x1) tmpGraph[x1][y1 + 1] = graph[nx][ny]; // 좌측 상단 모서리는 오른쪽으로
                            else tmpGraph[nx - 1][ny] = graph[nx][ny];          // 나머지는 위로
                        }
                    }
                }
            }
            
            // graph 복사 및 정답 기록
            for (int nx = x1; nx <= x2; nx++) {
                for (int ny = y1; ny <= y2; ny++) {
                    graph[nx][ny] = tmpGraph[nx][ny];
                }
            }
            answer[index++] = minNum;
        }
        return answer;
    }
}
