def solution(players, m, k):
    answer = 0
    
    # 1. 서버를 새로 증설했다면 k시간 이후에 제거하기 위한 24시간 배열 선언 후 초기화
    erase = [0] * 24
    
    # 2. 현재 서버 수를 기록할 변수 초기화
    servers = 1
    
    # 3. 24시간을 순회하면서 기록
    for i in range(24):
        # 현재 이용자 수
        user = players[i]
        
        # 만료된 서버가 있다면 빼기
        servers -= erase[i]
        
        # 커버 가능한 서버 수
        server = servers * m
        
        # 서버 수가 이용자 수보다 작거나 같다면 -> 서버 증가
        if user >= server:
            need = user // m - servers + 1
            
            # 1) 증가해야할 서버 계산 + 증설 횟수 answer에 기록
            servers += need
            answer += need
            
            # 2) k 시간 이후에 제거 기록
            if i + k < 24:
                erase[i + k] = need
    
    return answer