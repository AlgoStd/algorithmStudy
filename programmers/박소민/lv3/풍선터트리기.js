/*
설계
한 번만 번호가 더 작은 풍선
최소, 최대

투 포인터 방식
왼쪽 최솟값, 오른쪽 최솟값 + (왼쪽 포인터, 오른쪽 포인터 이동하면서 확인)

판단 기준 : 현재 포인터에 있는 값이 살아남을 수 있는가

1. 왼쪽 최솟값 < 오른쪽 최솟값
-> 왼쪽 최솟값은 항상 오른쪽 최솟값보다 작으므로 자신을 풍선을 터트릴 수 있음 = 피하자
-> 확실하게 살아남는 방법 자신이 오른쪽 최솟값보다 작으면 됨.
-> right-- (왼쪽은 움직여도 왼쪽 최솟값 작은 것, 오른쪽 최솟값 작은 것 모두 확인해야 하기 때문에 불확실함)
-> a[right] < rightMin 이라면 answer++
= 나는 왼쪽보다는 작을 수도 클 수도 있지만 오른쪽보다는 확실히 작아 = 살아남을 수 있어.

2. 반대의 경우 (vice versa)

※ 엣지 케이스
a의 길이가 2인 경우 -> 당연히 모두 살아남음
따라서 포인터는 그 안쪽으로 해야 한다. (left = 1, right = a.length - 2)
-> 이 경우 1 = a.length - 2 를 고려해야 하기 때문에 while (left <= right)로 적는다.
*/

function solution(a) {
  const n = a.length;

  if (n === 2) return n;

  var answer = 2;

  let left = 1;
  let right = n - 2;

  let leftMin = a[0];
  let rightMin = a[n - 1];

  while (left <= right) {
    // a의 모든 수는 서로 다름
    if (leftMin < rightMin) {
      if (a[right] < rightMin) {
        answer++;
        rightMin = a[right];
      }

      right--;
    } else {
      if (a[left] < leftMin) {
        answer++;
        leftMin = a[left];
      }

      left++;
    }
  }

  return answer;
}
