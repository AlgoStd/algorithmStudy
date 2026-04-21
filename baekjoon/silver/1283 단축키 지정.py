n = int(input())
quick = set() # 단축키들
for _ in range(n):
    line = input().rstrip()
    option_list = line.split()
    idx = -1
    cur_idx = 0

    for option in option_list:
        first_word = option[0].lower()
        if first_word not in quick:
            quick.add(first_word)
            idx = cur_idx
            break
        cur_idx += len(option) + 1

    if idx == -1:
        for i,ch in enumerate(line):
            if ch == ' ':
                continue
            if ch.lower() not in quick:
                quick.add(ch.lower())
                idx = i
                break

    if idx == -1:
        print(line)
    else:
        print(line[:idx] + '[' + line[idx] + ']' + line[idx+1:])






