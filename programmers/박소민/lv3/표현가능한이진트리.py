# 설계 (1)
# 트리 탐색 - dfs
# 1. 십진수 숫자를 이진수로 변환 (길이에 맞게 앞에 0 붙이기)
# 2. 가운데 수 (root 노드)부터 dfs로 들어감
# 3. 중간에 부모 노드가 0인데 자식 노드가 1이라면 실패

import math

def solution(numbers):
    answer = []
    
    for number in numbers:       
        # 1. 십진수 -> 이진수
        b_number = format(number, 'b')
        
        # 2. 포화이진트리 길이 판별 
        # (오답) (굳이 공식 만드려고 하지 말고 그냥 돌릴 것)
        b_len = len(b_number)
        k = 1
        
        while k < b_len:
            if 2**k - 1 >= b_len:
                break;
            k += 1
            
        target_len = 2**k - 1
        
        # 3. 문자열 길이만큼 앞에 0 붙여주기
        b_number = b_number.zfill(target_len)
        
        # 엣지 케이스 - 길이가 1인 경우 
        if b_len == 1:
            answer.append(1)
            continue
        
        can_make = True
        
        def dfs(start, end):
            nonlocal can_make
            
            if not can_make:
                return
            
            if start >= end:
                return
            
            mid = (start + end) // 2
            
            l_child_idx = (start + mid - 1) // 2
            r_child_idx = (mid + 1 + end) // 2
            
            if b_number[mid] == '0':
                if b_number[l_child_idx] == '1' or b_number[r_child_idx] == '1':
                    can_make = False
                    return
            
            dfs(start, mid - 1)
            dfs(mid + 1, end)
        
        dfs(0, target_len - 1) 
            
        answer.append(1 if can_make else 0)
    
    return answer