def solution(data, ext, val_ext, sort_by):
    index = {
        'code': 0,
        'date': 1,
        'maximum': 2,
        'remain': 3
    }
    
    answer = [d for d in data if d[index[ext]] < val_ext]
    answer.sort(key=lambda x: x[index[sort_by]])
        
    return answer