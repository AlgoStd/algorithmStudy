#include <string>
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

struct Point {
    long long x;
    long long y;
};

bool getIntegerIntersection(const vector<int>& line1, const vector<int>& line2, Point& outPoint) {
    long long a1 = line1[0], b1 = line1[1], c1 = line1[2];
    long long a2 = line2[0], b2 = line2[1], c2 = line2[2];
    
    long long det = a1 * b2 - a2 * b1;
    
    if (det == 0) return false;
    
    long long x_num = b1 * c2 - b2 * c1;
    long long y_num = a2 * c1 - a1 * c2;
    
    if (x_num % det != 0 || y_num % det != 0) return false;
    
    outPoint.x = x_num / det;
    outPoint.y = y_num / det;
    
    return true;
}

vector<string> solution(vector<vector<int>> line) {
    vector<Point> stars;
    
    long long min_x = LLONG_MAX;
    long long min_y = LLONG_MAX;
    long long max_x = LLONG_MIN;
    long long max_y = LLONG_MIN;
    
    int n = line.size();
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            Point p;
            
            if (getIntegerIntersection(line[i], line[j], p)) {
                stars.push_back(p);
                
                min_x = min(min_x, p.x);
                min_y = min(min_y, p.y);
                max_x = max(max_x, p.x);
                max_y = max(max_y, p.y);
            }
        }
    }
    
    vector<string> answer(max_y - min_y +1, string(max_x - min_x + 1, '.'));
    
    for (const Point& p : stars) {
        answer[max_y - p.y][p.x - min_x] = '*';
    }
    
    return answer;
}