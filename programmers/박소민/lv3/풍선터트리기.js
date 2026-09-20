/*
설계
한 번만 번호가 더 작은 풍선
최소, 최대
*/

function solution(a) {
    const n = a.length;
    var answer = 0;
    
    const leftMinArr = Array(n).fill(0);
    let leftMin = a[0];
    
    for (let i = 0; i < n; i++) {
        if (leftMin <= a[i]) {
            leftMinArr[i] = leftMin;
        } else {
            leftMinArr[i] = a[i];
            leftMin = a[i];
        }
    }
    
    const rightMinArr = Array(n).fill(0);
    let rightMin = a[n-1];
    
    for (let i = n - 1; i >= 0; i--) {
        if (rightMin <= a[i]) {
            rightMinArr[i] = rightMin;
        } else {
            rightMinArr[i] = a[i];
            rightMin = a[i];
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (a[i] === leftMinArr[i] || a[i] === rightMinArr[i]) {
            answer++;
        }
    }
    
    return answer;
}