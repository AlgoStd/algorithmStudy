# 구현 설계(1)

def solution(data, ext, val_ext, sort_by):
    answer = []
    
    ext_map = {"code" : 0, "date" : 1, "maximum" : 2, "remain" : 3}
    ext_idx = ext_map[ext]
    
    # 1. ext에서 val_ext보다 작은 값을 answer에 넣기
    for val in data:
        if val[ext_idx] < val_ext:
            answer.append(val)
    
    sort_idx = ext_map[sort_by]
    
    # 2. sort_by에 해당하는 값을 기준으로 오름차순 정렬
    answer.sort(key=lambda x: x[sort_idx])
    
    return answer