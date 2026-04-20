import heapq
t = int(input())
for _ in range(t):
    k = int(input())
    max_heap = list()
    min_heap = list()
    for _ in range(k):
        d,n = input().split()
        n = int(n)
        if d == 'I':
            heapq.heappush(min_heap, n)
            heapq.heappush(max_heap, -n)
        elif d == 'D':
            if not max_heap and not min_heap:
                continue
            if n == 1:
                # 최댓값 삭제
                x = heapq.heappop(max_heap)
                min_heap.remove(-x)
            elif n == -1:
                # 최솟값 삭제
                x = heapq.heappop(min_heap)
                max_heap.remove(-x)
    if max_heap:
        print(f"{-heapq.heappop(max_heap)} {heapq.heappop(min_heap)}")
    else:
        print("EMPTY")

