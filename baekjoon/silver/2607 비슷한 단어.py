from collections import Counter

n = int(input())
first = input()
words = [input() for _ in range(n-1)]
result = 0
for word in words:
    first_len = len(first)
    word_len = len(word)
    left_list = []
    if first_len >= word_len:
        left_list = list((Counter(first) - Counter(word)).elements())
    else:
        left_list = list((Counter(word) - Counter(first)).elements())
    if len(left_list) <= 1:
        result += 1

print(result)
