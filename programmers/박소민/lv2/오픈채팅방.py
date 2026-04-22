def solution(record):
    answer = []
    people = {}
    
    for line in record:
        parts = line.split(" ")
        
        # if in 자주 사용하자
        if parts[0] in ("Enter", "Change"):
            people[parts[1]] = parts[2]
            
    for line in record:
        parts = line.split(" ")
        action = parts[0]
        uid = parts[1]
        
        if action == "Enter":
            answer.append(f"{people[uid]}님이 들어왔습니다.")
        elif action == "Leave":
            answer.append(f"{people[uid]}님이 나갔습니다.")
    
    return answer