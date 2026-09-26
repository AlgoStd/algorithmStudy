# 시뮬레이션
# 이유 : 분기에 대한 설명이 상세함
# 안되는 경우를 모두 찾은 후에 되는 결과로 반환
# 이유 : 안되는 경우(반례)에 대한 설명이 가득함
# 1. 개수 찾기
# O -> X 순서 (O의 개수 != X의 개수 (+ 1))
# 2. 승리 조건
# 1) O가 승리했을 때 X도 승리하는 경우 -> X
# 2) O가 승리했을 때 O의 개수 != X의 개수 + 1
# 3) X가 승리했을 때 O의 개수 != X의 개수

def solution(board):
    on = 0
    xn = 0
    
    for row in board:
        for val in row:
            if val == "O":
                on += 1
            elif val == "X":
                xn += 1
    
    def isWin(target):
        # 1. 가로
        for r in range(3):
            if board[r][0] == target and board[r][1] == target and board[r][2] == target:
                return True
        
        # 2. 세로
        for c in range(3):
            if board[0][c] == target and board[1][c] == target and board[2][c] == target:
                return True
        
        # 3. 대각선
        if board[0][0] == target and board[1][1] == target and board[2][2] == target:
            return True
        elif board[0][2] == target and board[1][1] == target and board[2][0] == target:
            return True
        
        return False
    
    # 1. 개수
    if on != xn and on != xn + 1:
        return 0
    
    # 2. 승리조건
    ow = isWin('O')
    xw = isWin('X')
    
    # 1) O가 승리했을 때 X도 승리하는 경우 -> X
    if ow and xw:
        return 0
    
    # 2) O가 승리했을 때 O의 개수 != X의 개수 + 1
    elif ow and on != xn + 1:
        return 0
    
    # 3) X가 승리했을 때 O의 개수 != X의 개수
    elif xw and on != xn:
        return 0
    
    return 1