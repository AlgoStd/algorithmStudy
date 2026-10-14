def solution(users, emoticons):
    n = len(users)
    m = len(emoticons)
    answer = [0, 0]
    
    sales = [0] * m
    
    def dfs(idx):
        if idx >= m:
            total = [0, 0]
            
            for [percent, budget] in users:
                buying = 0;
                
                for i in range(m):
                    price = emoticons[i]
                    sale = sales[i]
                    
                    if sale >= percent:
                        buying += (price * (100 - sale)) / 100
                
                if 0 <= buying < budget:
                    total[1] += buying
                else:
                    total[0] += 1
            
            if total[0] > answer[0]:
                answer[0] = total[0]
                answer[1] = total[1]
            elif total[0] == answer[0]:
                answer[1] = max(answer[1], total[1])
            
            return
        
        for sale in [10, 20, 30, 40]:
            sales[idx] = sale
            dfs(idx + 1)
    
    dfs(0)
                    
    return answer