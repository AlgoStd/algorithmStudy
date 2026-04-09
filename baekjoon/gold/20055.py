result = 0

n, k = map(int, input().split())
arr = list(map(int, input().split()))
robots = [0 for _ in range(n)]

def check():
    count = 0
    for x in arr:
        if x == 0:
            count += 1
    return count >= k

while True:
    result += 1

    # 1. 벨트 회전
    arr = [arr[-1]] + arr[:-1]
    robots = [0] + robots[:-1]

    # 내리는 위치 로봇 제거
    robots[n-1] = 0

    # 2. 로봇 이동
    for i in range(n-2, -1, -1):
        if robots[i] == 1 and robots[i+1] == 0 and arr[i+1] > 0:
            robots[i] = 0
            if i + 1 != n - 1:
                robots[i+1] = 1
            arr[i+1] -= 1

    # 내리는 위치 로봇 제거
    robots[n-1] = 0

    # 3. 올리는 위치에 로봇 올리기
    if arr[0] > 0 and robots[0] == 0:
        robots[0] = 1
        arr[0] -= 1

    # 4. 종료 조건
    if check():
        break

print(result)