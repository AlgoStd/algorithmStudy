def solution(N, stages):
    answer = []
    
    # 1. N + 2 만큼 배열의 길이 선언해서 현재 도전 중인 스테이지 번호 저장
    # N + 1은 마지막 스테이지까지 클리어한 사용자이므로, 1-index
    levels = [0] * (N + 2)
    
    for num in stages:
        levels[num] += 1
    
    # 2. 도전한 사람 수 선언
    total = len(stages)
    
    # 3. levels 배열을 순회하면서 계산한 실패율과 스테이지를 answer에 넣기
    # 참고로 total이 0이 된다면 0 넣기 (0/0은 무한대이므로)
    # [수정] 리스트보다는 튜플이 메모리 오버헤드가 적다
    for idx in range(1, N + 1):
        num = levels[idx]
        failure = num / total if total != 0 else 0
        answer.append((failure, idx))
        total -= num
    
    answer.sort(key=lambda x : (x[0], -x[1]), reverse = True)
    
    return [stage for [_, stage] in answer]