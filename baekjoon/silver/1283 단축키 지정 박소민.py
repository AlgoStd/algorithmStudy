import sys

def assign_shortcut():
    input_data = sys.stdin.read().splitlines()
    if not input_data:
        return
    
    n = int(input_data[0])
    options = input_data[1:n+1]
    
    assigned_keys = set()
    
    def process_option(option):
        words = option.split()
        
        for i, word in enumerate(words):
            first_char = word[0].lower()
            if first_char not in assigned_keys:
                assigned_keys.add(first_char)
                words[i] = f"[{word[0]}]{word[1:]}"
                return " ".join(words) # 찾으면 즉시 반환 (플래그 불필요)

        chars = list(option)
        for i, char in enumerate(chars):
            if char != ' ' and char.lower() not in assigned_keys:
                assigned_keys.add(char.lower())
                chars[i] = f"[{char}]"
                return "".join(chars) # 찾으면 즉시 반환
                
        return option
    
    for option in options:
        print(process_option(option))
        
if __name__ == "__main__":
    assign_shortcut()