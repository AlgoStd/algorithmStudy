def solution(name, yearning, photo):
    answer = []
    new_dict = dict(zip(name, yearning))
    for p in photo:
        cur_answer = 0
        for e in p:
            if e in name:
                cur_answer += new_dict[e]
        answer.append(cur_answer)
    return answer
