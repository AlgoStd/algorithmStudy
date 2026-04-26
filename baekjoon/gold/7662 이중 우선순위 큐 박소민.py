import sys
import heapq

def solve():
    input = sys.stdin.readline
    T = int(input())
    
    for _ in range(T):
        k = int(input())
        
        min_heap = []
        max_heap = []
        visited = [False] * k
        
        for i in range(k):
            line = input().split()
            command = line[0]
            val = int(line[1])
            
            if command == "I":
                heapq.heappush(min_heap, (val, i))
                heapq.heappush(max_heap, (-val, i))
                visited[i] = True
                
            elif command == "D":
                
                if val == 1:
                    while max_heap:
                        _, max_i = heapq.heappop(max_heap)
                        if visited[max_i]:
                            visited[max_i] = False
                            break
                    
                elif val == -1:
                    while min_heap:
                        _, min_i = heapq.heappop(min_heap)
                        if visited[min_i]:
                            visited[min_i] = False
                            break
        
        while min_heap:
            min_i = min_heap[0][1]
            
            if not visited[min_i]:
                heapq.heappop(min_heap)
            else:
                break
            
        while max_heap:
            max_i = max_heap[0][1]
            
            if not visited[max_i]:
                heapq.heappop(max_heap)
            else:
                break
                
        
        if min_heap:
            max_val, _ = heapq.heappop(max_heap)
            min_val, _ = heapq.heappop(min_heap)
            print(f'{-max_val} {min_val}')
        else:
            print("EMPTY")
        
        
if __name__ == "__main__":
    solve()