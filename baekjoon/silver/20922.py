n,k = map(int, input().split())
arr = list(map(int, input().split()))
count = {}
start = 0
answer = 0

for end in range(n):
    if arr[end] in count:
        count[arr[end]] += 1
    else:
        count[arr[end]] = 1

    while count[arr[end]] > k:
        count[arr[start]] -= 1
        start += 1

    answer = max(answer, end - start + 1)
print(answer)
