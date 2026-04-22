# 파이썬 dict: 키의 값(내용물)을 해시 ➡️ 인덱스 ➡️ 저장 (값 불변 필수!) (키 참조 주소, 값 참조 주소)
# JS {}: 무조건 키를 문자열로 강제 변환 ➡️ 문자열을 해시 ➡️ 인덱스 ➡️ 저장
# JS Map: 객체의 경우 메모리 주소(참조값) 자체를 해시 ➡️ 인덱스 ➡️ 저장 (값 변해도 주소만 같으면 됨!)
# 최악의 경우 (O(n)): 테이블이 2/3 차서 리사이징(이사) 할 때, 또는 해시 충돌이 꼬리에 꼬리를 물 때.

def solution(schedules, timelogs, startday):
    answer = 0
    
    for i, arr in enumerate(timelogs):
        day = startday
        time = schedules[i] + 10
        
        if time % 100 >= 60:
            time += 40
        
        # for else 좋다.
        for val in arr:
            # if in 도 좋다
            if day % 7 in (0, 6):
                day += 1
                continue
                
            if val > time:
                break
            
            day += 1
                
        else:
            answer += 1
        
    return answer