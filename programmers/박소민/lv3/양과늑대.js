/*
연결리스트
visited 필요 없음(갔던 노드 또 가도 되기 때문에) 대신에 후보 노드 배열 필요.
2^17 = 131072 -> 비트마스킹 가능 -> visited돌기?
순서가 중요하다

후보 노드 백트래킹 구현(시도해보았지만 실패)
후보 노드 인자로 넘기기
*/

function solution(info, edges) {
  const n = info.length;
  // 최대 양을 저장할 수 있는 변수 초기화
  let answer = 0;

  // 연결리스트 생성 단방향 간선 (사이클 없는 트리)
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
  }

  // 시작 노드, 늑대 수, 양의 수, 후보 배열
  const dfs = (node, w, s, candidates) => {
    // 1) 현재 노드 확인 -> 늑대 수, 양의 수 갱신
    const nw = info[node] === 1 ? w + 1 : w;
    const ns = info[node] === 0 ? s + 1 : s;

    // 엣지케이스: 늑대의 수가 양의 수보다 같거나 많다면 return
    if (nw >= ns) return;

    answer = Math.max(answer, ns);

    // [수정] nextNodes 반복문으로 넣기 보다는 스프레드 연산자 활용
    // 2) 현재 노드에서 다음 노드로 들어가기 위한 후보 노드 추가
    const nextNodes = [...candidates, ...graph[node]];

    // [수정] nextNode.length === 0이라면 알아서 종료 되므로 엣지케이스 삭제
    // 3) 그 다음 후보 노드로 dfs 돌리기
    for (let i = 0; i < nextNodes.length; i++) {
      const next = nextNodes[i];
      // [수정] filter를 활용해서 새로운 배열 전달
      dfs(
        next,
        nw,
        ns,
        nextNodes.filter((_, idx) => idx !== i),
      );
    }
  };

  dfs(0, 0, 0, []);

  return answer;
}
