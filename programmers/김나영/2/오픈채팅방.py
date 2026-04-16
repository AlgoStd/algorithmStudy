'''
닉네임 변경 : 나간 후 새로운 닉네임으로 다시 / 채팅방에서 닉네임 변경
닉네임 변경 시 기존 채팅방에 출력되어 있던 메시지의 닉네임도 모두 변경

전략 : 출력문을 uid 기준으로 써두고 마지막에 합치기
'''


def solution(record):
    answer = []
    logs = []
    nicknames = dict()  # {아이디, 닉네임}

    # 닉네임만 바꾸기
    for rec in record:
        words = list(rec.split())
        if words[0] == "Enter":
            nicknames[words[1]] = words[2]
        elif words[0] == "Change":
            nicknames[words[1]] = words[2]

    # 출력문 만들기
    for rec in record:
        words = list(rec.split())
        string = nicknames[words[1]]
        if words[0] == "Enter":
            string += "님이 들어왔습니다."
            answer.append(string)
        elif words[0] == "Leave":
            string += "님이 나갔습니다."
            answer.append(string)

    return answer