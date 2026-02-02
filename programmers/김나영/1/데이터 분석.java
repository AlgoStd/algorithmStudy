import java.util.*;

class Solution {
    static String curSortBy;
    
    static class Data implements Comparable<Data>{
        int code;
        int date;
        int maximum;
        int remain;
        
        Data(int code, int date, int maximum, int remain) {
            this.code = code;
            this.date = date;
            this.maximum = maximum;
            this.remain = remain;
        }
        
        @Override
        public int compareTo(Data d) {
            if (curSortBy.equals("code")) {
                return this.code - d.code;
            } else if (curSortBy.equals("date")) {
                return this.date - d.date;
            } else if (curSortBy.equals("maximum")) {
                return this.maximum - d.maximum;
            } else if (curSortBy.equals("remain")) {
                return this.remain - d.remain;
            }
            return 0;
        }
    }
    public int[][] solution(int[][] data, String ext, int val_ext, String sort_by) {
        
        List<Data> datas = new ArrayList<>();
        for (int[] d : data) {
            Data newData = new Data(d[0],d[1],d[2],d[3]);
            if (ext.equals("code") && (d[0] >= val_ext) 
               || ext.equals("date") && (d[1] >= val_ext) 
               || ext.equals("maximum") && (d[2] >= val_ext)
               || ext.equals("remain") && (d[3] >= val_ext)) {
                continue;
            }
            datas.add(newData);
        }
        curSortBy = sort_by;
        
        Collections.sort(datas);
        int[][] answer = new int[datas.size()][4];
        for (int i = 0; i < datas.size(); i++) {
            answer[i][0] = datas.get(i).code;
            answer[i][1] = datas.get(i).date;
            answer[i][2] = datas.get(i).maximum;
            answer[i][3] = datas.get(i).remain;
        }
        
        return answer;
    }
}
