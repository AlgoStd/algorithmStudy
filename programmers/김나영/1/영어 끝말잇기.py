def solution(n, words):
    used_words = set()

    prv_word = ""
    for idx in range(len(words)):
        t = idx // n + 1
        i = idx % n + 1
        word = words[idx]

        if prv_word != "":
            if word in used_words or prv_word[-1] != word[0]:
                return [i, t]

        used_words.add(word)
        prv_word = word
        
    return [0,0]
