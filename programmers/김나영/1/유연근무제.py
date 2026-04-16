'''
출근 희망 시각 + 10분까지 출근
토요일, 일요일은 영향 x
매일 한 번씩만 출근
시각 = 시 * 100 + 분
상품을 받을 직원 몇명인지 구하기
'''

def solution(schedules, timelogs, startday):
    answer = 0
    n = len(schedules) # 직원 수
    for i in range(n):
        # 분 : schedules[i] % 100
        # 시 : schedules[i] // 100
        checkin = schedules[i] + 10 # 출근 마감 시간
        if checkin % 100 >= 60:
            checkin += 40
        timelog = timelogs[i]
        result = True
        for j in range(7):
            # 일주일 동안
            day = startday + j
            if day % 7 == 0 or day % 7 == 6:
                continue
            if timelog[j] > checkin:
                result = False
        if result:
            answer += 1
    return answer