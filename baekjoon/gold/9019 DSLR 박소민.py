import sys
from collections import deque

# 설계
# 최소한의 명령어 = 최단 거리 = bps

MAX_NUM = 10000

def get_next_states(num: int) -> tuple:
    """현재 숫자에서 D, S, L, R 연산을 수행한 결과와
       해당 명령어를 튜플로 반환"""
    return (
        ((num * 2) % MAX_NUM, 'D'),                           # D 연산
        ((num - 1) % MAX_NUM, 'S'),                           # S 연산 (-1 % 10000은 파이썬에서 9999로 자동 계산됨)
        ((num % 1000) * 10 + num // 1000, 'L'),               # L 연산
        ((num % 10) * 1000 + num // 10, 'R')                  # R 연산
    )

def solve():
    input = sys.stdin.readline
    T = int(input())
    
    for _ in range(T):
        start, end = map(int, input().split())
        parent = [-1] * MAX_NUM
        command = [''] * MAX_NUM
        
        queue = deque([start])
        parent[start] = start
        
        while queue:
            curr = queue.popleft()
            
            if curr == end:
                path = []
                
                while curr != start:
                    path.append(command[curr])
                    curr = parent[curr]
                    
                result = "".join(path[::-1])
                print(result) 
                break
                
            for next_num, cmd in get_next_states(curr):
                if parent[next_num] == -1:
                    parent[next_num] = curr
                    command[next_num] = cmd
                    queue.append(next_num)
        
if __name__ == "__main__":
    solve()