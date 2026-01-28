
// 기본 시간 이하 : 기본 요금
// 기본 시간 초과 : 기본 요금 + 단위 시간 * 단위 요금
// 단위 시간으로 나누어 떨어지지 않으면 올림 :1.5 -> 2
// 00:00부터 23:59까지

// output
// 차량 번호 작은 자동차부터 주차요금 넣기
import java.util.*;

class Solution {

    static Map<String, Integer> cars = new TreeMap<>();
    static Map<String, Integer> times = new TreeMap<>();
    static List<String>[] inList;
    static List<String>[] outList;

    private static int countTime(String in, String out) {
        String[] splitedIn = in.split(":");
        String[] splitedOut = out.split(":");

        int inH = Integer.parseInt(splitedIn[0]);
        int inM = Integer.parseInt(splitedIn[1]);

        int outH = Integer.parseInt(splitedOut[0]);
        int outM = Integer.parseInt(splitedOut[1]);

        int hDiff = outH - inH;

        if (inM > outM) {
            hDiff -=1;
            outM += 60;
        }

        return hDiff * 60 + (outM - inM);
    }

    public int[] solution(int[] fees, String[] records) {

        // 1. 차량 번호 별 누적 주차 시간 확인
        // 1.1 입차만 있고 출차가 없으면? 23:59 출차 처리
        // 1.2 (출차 - 입차) 합하기

        int carCnt = 0;

        // index 기록
        for (String record : records) {
            String[] slist = record.split(" ");
            String time = slist[0];
            String carNum = slist[1];
            String io = slist[2];

            if (cars.get(carNum) == null) {
                cars.put(carNum, carCnt++);
            }
        }

        inList = new List[carCnt];
        outList = new List[carCnt];

        for (int i = 0; i < carCnt; i++) {
            inList[i] = new ArrayList<String>();
            outList[i] = new ArrayList<String>();
        }

        for (String record : records) {
            String[] slist = record.split(" ");
            String time = slist[0];
            String carNum = slist[1];
            String io = slist[2];

            int carIndex = cars.get(carNum);

            if (io.equals("IN")) {
                inList[carIndex].add(time);
            } else {
                outList[carIndex].add(time);
            }
        }

        // 출차없는 경우 찾기
        for (int i = 0; i < carCnt; i++) {
            if (inList[i].size() != outList[i].size()) {
                outList[i].add("23:59");
            }
        }


        Iterator<Map.Entry<String, Integer>> iterator = cars.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Integer> entry = iterator.next();
            String key = entry.getKey();
            int index = entry.getValue();

            int size = inList[index].size();
            int totalTime = 0;
            for (int i = 0; i < size; i++) {
                int t = countTime(inList[index].get(i), outList[index].get(i));
                totalTime += t;
            }

            times.put(key, totalTime);
        }


        iterator = times.entrySet().iterator();
        int j = 0;

        int[] answer = new int[carCnt];

        // 주차 요금 = 기본 요금 + 단위 요금 * [(누적시간 - 기본시간) / 단위 시간 + 1]
        // 기본 시간 / 기본 요금 / 단위 시간 / 단위 요금
        while (iterator.hasNext()) {
            Map.Entry<String, Integer> entry = iterator.next();
            int rest = (((entry.getValue() - fees[0]) % fees[2]) != 0) ? 1 : 0;
            int total = entry.getValue();
            int plus = ((entry.getValue() - fees[0]) / fees[2]);

            if (total <= fees[0]) {
                answer[j] = fees[1];
                j++;
                continue;
            } else {
                int fee = fees[1] + fees[3] * (((entry.getValue() - fees[0]) / fees[2]) + rest);
                answer[j] = fee;
                j++;
            }
            // System.out.println("rest : " + rest);
            // System.out.println("plus : " + (((entry.getValue() - fees[0]) / fees[2]) + rest));
            // System.out.println("Key : " + entry.getKey() + " time : " + entry.getValue() + " fee : " + fee);
            // System.out.println(fee);
            // answer[j] = fee;
            // j++;
        }

        return answer;
    }
}