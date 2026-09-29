class MinHeap {
  constructor() {
    this.h = [];
  }
  size() {
    return this.h.length;
  }

  push(node) {
    this.h.push(node);
    let i = this.size() - 1;

    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.h[p][1] < this.h[i][1]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }

  pop() {
    const top = this.h[0];
    const last = this.h.pop();
    const n = this.size();

    if (n > 0) {
      this.h[0] = last;
      let i = 0;
      while (n > i) {
        let smallest = i;
        const l = i * 2 + 1;
        const r = i * 2 + 2;
        if (l < n && this.h[l][1] < this.h[smallest][1]) smallest = l;
        if (r < n && this.h[r][1] < this.h[smallest][1]) smallest = r;
        if (smallest === i) break;
        [this.h[smallest], this.h[i]] = [this.h[i], this.h[smallest]];
      }
    }

    return top;
  }
}

function solution(n, s, a, b, fares) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v, w] of fares) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  // 0 : s 출발, 1 : a 출발, 2 : b 출발
  const dist = Array.from({ length: 3 }, () => Array(n + 1).fill(Infinity));

  const dijkstra = (start, type) => {
    const pq = new MinHeap();
    pq.push([start, 0]);
    dist[type][start] = 0;

    while (pq.size() > 0) {
      const [u, d] = pq.pop();

      if (d > dist[type][u]) continue;

      for (const [v, w] of graph[u]) {
        if (dist[type][u] + w < dist[type][v]) {
          dist[type][v] = dist[type][u] + w;
          pq.push([v, dist[type][u] + w]);
        }
      }
    }
  };

  dijkstra(s, 0);
  dijkstra(a, 1);
  dijkstra(b, 2);

  let answer = Infinity;
  for (let i = 1; i <= n; i++) {
    const totalDist = dist[0][i] + dist[1][i] + dist[2][i];
    if (answer > totalDist) {
      answer = totalDist;
    }
  }

  return answer;
}
