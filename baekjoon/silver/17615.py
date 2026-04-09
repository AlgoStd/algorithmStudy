# 규칙에 따라 볼 이동하여 최소 이동회수 찾기

n = int(input())
arr = list(input().rstrip())

def move(start, end, letter, dir):
    count = 0
    if dir == 1:
        for i in range(start, end):
            if arr[i] == letter:
                count += 1
            else: break
    elif dir == -1:
        for i in range(start, end, -1):
            if arr[i] == letter:
                count += 1
            else: break
    return count


count_r = arr.count('R')
count_b = arr.count('B')

count1 = count_r - move(n-1,-1,'R',-1)
count2 = count_b - move(n-1,-1,'B',-1)
count3 = count_r - move(0,n,'R',1)
count4 = count_b - move(0,n,'B',1)
print(min(count1,count2,count3,count4))
