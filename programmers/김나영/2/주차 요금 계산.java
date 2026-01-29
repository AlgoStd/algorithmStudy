import java.util.*;

class Solution {
    
    public class Car {
        public int number;
        public int inHour;
        public int inMinute;
        public int inTime;
        public int price = 0;
        public int totalTime = 0;
        
        Car(int number, int inHour, int inMinute) {
            this.number = number;
            this.inHour = inHour;
            this.inMinute = inMinute;
            this.inTime = -1;
        }
        
        void setIn(int inHour, int inMinute) {
            this.inHour = inHour;
            this.inMinute = inMinute;
            this.inTime = -1;
        }
        
        void addTime(int outHour, int outMinute) {
            int currentTime = (outHour - this.inHour) * 60 + (outMinute - this.inMinute);
            System.out.println(currentTime);
            this.totalTime += currentTime;
            this.inHour = 0;
            this.inMinute = 0;
            this.inTime = 0;
        }
        
        void countPrice(int[] fees) {
            if (this.totalTime > fees[0]) {
                int leftTime = this.totalTime - fees[0];
                int leftPrice = (int) Math.ceil((double) leftTime / fees[2]) * fees[3];
                this.price += leftPrice;
            }
            this.price += fees[1];
        }
        
        
    }
    
    public int[] solution(int[] fees, String[] records) {
        List<Integer> carNumbers = new ArrayList<>();
        Map<Integer, Car> map = new HashMap<>();
        
        //fees : 기본 시간 / 기본 요금 / 단위 시간 / 단위 요금
        for (String record : records) {
            int hour = Integer.parseInt(record.substring(0,2));
            int minute = Integer.parseInt(record.substring(3,5));
            int number = Integer.parseInt(record.substring(6,10));
            String inout = record.substring(11);
            if (inout.equals("IN")) {
                Car thisCar;
                if (map.containsKey((number))) {
                    thisCar = map.get(number);
                    thisCar.setIn(hour, minute);
                } else {
                    thisCar = new Car(number, hour, minute);
                    map.put(number, thisCar);
                    carNumbers.add(number);
                }
            }
            else if (inout.equals("OUT")) {
                Car thisCar = map.get(number);
                thisCar.addTime(hour, minute);
            }
            
        }
        
        for (Car car : map.values()) {
            if (car.inTime != 0) {
                car.addTime(23, 59);
            }
            car.countPrice(fees);
        }
        
        Collections.sort(carNumbers);
        int[] answer = new int[carNumbers.size()];
        
        for (int i = 0; i < carNumbers.size(); i++) {
            Car car = map.get(carNumbers.get(i));
            answer[i] = car.price;
        }
        
        return answer;
    }
}
