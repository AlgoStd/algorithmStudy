from collections import deque
import sys

input = sys.stdin.readline
t = int(input())

def D(n):
    return (n * 2) % 10000

def S(n):
    return 9999 if n == 0 else n - 1

def L(n):
    return (n % 1000) * 10 + (n // 1000)

def R(n):
    return (n % 10) * 1000 + (n // 10)

for _ in range(t):
    a, b = map(int, input().split())

    queue = deque()
    visited = [False] * 10000
    queue.append((a, ""))
    visited[a] = True
    result = ""

    while queue:
        number, op = queue.popleft()

        if number == b:
            result = op
            break

        d_num = D(number)
        if not visited[d_num]:
            visited[d_num] = True
            queue.append((d_num, op + "D"))

        s_num = S(number)
        if not visited[s_num]:
            visited[s_num] = True
            queue.append((s_num, op + "S"))

        l_num = L(number)
        if not visited[l_num]:
            visited[l_num] = True
            queue.append((l_num, op + "L"))

        r_num = R(number)
        if not visited[r_num]:
            visited[r_num] = True
            queue.append((r_num, op + "R"))

    print(result)
