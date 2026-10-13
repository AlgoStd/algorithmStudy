def solution(s):
    answer = s
    
    words = [
        "zero", "one",  "two", "three", "four",
        "five", "six", "seven", "eight", "nine"
    ]
    
    for i in range(10):
        answer = f"{i}".join(answer.split(words[i]))
    
    return int(answer)