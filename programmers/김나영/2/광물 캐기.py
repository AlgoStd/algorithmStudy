def solution(picks, minerals):
    answer = 0
    graph = [[1,1,1],[5,1,1],[25,5,1]]
            
    gogks = dict()
    total_gogks = 0
    for i in range(3):
        gogks[i] = picks[i]
        total_gogks += picks[i]
    
    minerals = minerals[:total_gogks * 5]

    def cal_price(bundle, g):
        cur_answer = 0
        cur_minerals = bundle[1:][0]
        for miner in cur_minerals:
            if miner == 'diamond':
                cur_answer += graph[g][0]
            elif miner == 'iron':
                cur_answer += graph[g][1]
            elif miner == 'stone':
                cur_answer += graph[g][2]
        return cur_answer
    
    l = len(minerals)
    
    # 돌 곡괭이 기준으로 우선순위 정렬
    bundles = []
    for i in range(0,l,5):
        chunk = minerals[i:i+5]
        cost = 0
        cost += chunk.count("diamond") * 25
        cost += chunk.count("iron") * 5
        cost += chunk.count("stone") * 1
        bundles.append((cost, chunk))
    bundles.sort(key=lambda x:x[0], reverse=True)

    for bundle in bundles:        
        min_price = 25 * 5
        min_gogk = 2
        if total_gogks == 0:
            break
        for g in range(3): # 0 1 2
            cur_answer = 0
            if gogks[g] == 0:
                continue
            elif gogks[g] > 0:
                cur_answer = cal_price(bundle,g)
            if cur_answer < min_price:
                min_price = cur_answer
                min_gogk = g
        answer += min_price
        gogks[min_gogk] -= 1
        total_gogks -= 1

    return answer
