"""
노드 : 지점 번호 / 간선 : 예상 택시요금

문제 풀이 전략 : 다익스트라
a,b,s 각 지점에서 다른 노드들끼리의 최단 거리 구하기
result = a 거리 + b 거리 + s 거리 의 최소
"""
import heapq


def solution(n, s, a, b, fares):
    answer = 0

    graph = [[] for _ in range(n + 1)]
    for u, v, w in fares:
        graph[u].append((v, w))
        graph[v].append((u, w))

    def dijkstra(start):
        distances = [float('inf')] * (n + 1)
        distances[start] = 0
        queue = [(start, 0)]  # 노드, 비용

        while queue:
            cur_node, cur_dist = heapq.heappop(queue)

            if distances[cur_node] < cur_dist:
                continue

            for nxt_node, nxt_dist in graph[cur_node]:
                distance = cur_dist + nxt_dist
                if distance < distances[nxt_node]:
                    distances[nxt_node] = distance
                    heapq.heappush(queue, (nxt_node, distance))

        return distances

    dist_s = dijkstra(s)
    dist_a = dijkstra(a)
    dist_b = dijkstra(b)

    answer = dist_a[s] + dist_b[s]
    for i in range(1, n + 1):
        if i != s:
            # 시작, 도착점이 아닌 중간 노드들에 대하여
            tmp_dist = dist_a[i] + dist_b[i] + dist_s[i]
            answer = min(answer, tmp_dist)

    return answer