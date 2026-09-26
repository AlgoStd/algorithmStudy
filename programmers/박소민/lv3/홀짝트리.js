/*
설계
모든 노드를 루트노드로 설정하면서
홀짝 트리 혹은 역홀짝 트리인지 확인 -> 개수 반환

시간복잡도 O(n)
dfs/bfs

1. 홀짝 트리, 역홀짝 트리로 묶기 (연결 리스트)
2. 루트 돌면서 홀짝 트리, 역홀짝 트리인지 판별

역홀짝 트리
*/

function solution(nodes, edges) {
  var answer = [0, 0];
  const visited = new Map();
  const graph = new Map();

  for (const node of nodes) {
    visited.set(node, false);
    graph.set(node, []);
  }

  // 연결리스트 만들기
  for (const [u, w] of edges) {
    graph.get(u).push(w);
    graph.get(w).push(u);
  }

  const bfs = (start) => {
    // 루트인 경우 홀, 역 -> 한 개라면 그 종류에 각각 추가
    const trees = [0, 0];
    const queue = [];
    let head = 0;

    visited.set(start, true);
    queue.push(start);

    while (head < queue.length) {
      const node = queue[head++];

      const next = graph.get(node);

      const num = next.length;

      // 같은 경우 홀짝 트리 아닌 경우 역홀짝 트리
      if (node % 2 === num % 2) {
        trees[0]++;
      } else {
        trees[1]++;
      }

      for (const val of next) {
        if (!visited.get(val)) {
          visited.set(val, true);
          queue.push(val);
        }
      }
    }

    if (trees[0] === 1) answer[0]++;
    if (trees[1] === 1) answer[1]++; // else if 가 아닌 if문
    // 반례 노드가 한개인 경우
  };

  for (const node of nodes) {
    if (!visited.get(node)) {
      bfs(node);
    }
  }

  return answer;
}
