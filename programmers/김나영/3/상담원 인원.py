import heapq

def solution(k, n, reqs):
    times = [[] for _ in range(k + 1)]

    for start, duration, category in reqs:
        times[category].append((start, duration))

    extra = n - k  # 각 유형에 1명씩 배정하고 남은 인원

    def get_wait_time(req_list, m):
        pq = []
        wait = 0

        for start, duration in req_list:
            if len(pq) < m:
                heapq.heappush(pq, start + duration)
            else:
                end = heapq.heappop(pq)
                if end <= start:
                    heapq.heappush(pq, start + duration)
                else:
                    wait += end - start
                    heapq.heappush(pq, end + duration)
        return wait

    answer = float('inf')
    selected = [1] * (k + 1)

    def dfs(category, remaining):
        nonlocal answer

        if category == k + 1:
            if remaining == 0:
                total = 0
                for c in range(1, k + 1):
                    total += get_wait_time(times[c], selected[c])
                answer = min(answer, total)
            return

        for extra_cnt in range(remaining + 1):
            selected[category] = 1 + extra_cnt
            dfs(category + 1, remaining - extra_cnt)

    dfs(1, extra)

    return answer
