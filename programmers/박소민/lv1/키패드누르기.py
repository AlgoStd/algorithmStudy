keypad = {
    1: [0, 0], 2: [0, 1], 3: [0, 2],
    4: [1, 0], 5: [1, 1], 6: [1, 2],
    7: [2, 0], 8: [2, 1], 9: [2, 2],
    '*': [3, 0], 0: [3, 1], '#': [3, 2]
}

# 맨헤튼 거리
def dist(n1, n2):
    return abs(n1[0] - n2[0]) + abs(n1[1] - n2[1])

def solution(numbers, hand):
    answer = []
    
    left = keypad['*']
    right = keypad['#']
    
    for number in numbers:
        curr = keypad[number]
        
        if number == 0 or number % 3 == 2:
            left_d = dist(curr, left)
            right_d = dist(curr, right)
            
            if left_d > right_d:
                answer.append("R")
                right = curr
            elif left_d < right_d:
                answer.append("L")
                left = curr
            else:
                if hand == "right":
                    answer.append("R")
                    right = curr
                else:
                    answer.append("L")
                    left = curr
        elif number % 3 == 1:
            answer.append("L")
            left = curr
        else:
            answer.append("R")
            right = curr
    
    return "".join(answer)