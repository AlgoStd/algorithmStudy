const dict = {"code" : 0, "date" : 1, "maximum" : 2, "remain" : 3};

function solution(data, ext, val_ext, sort_by) {
    const idx = dict[ext];
    const answer = [];
    
    for (const val of data) {
        if (Number(val[idx]) < Number(val_ext)) {
            answer.push(val);
        }
    }
    
    const sortIdx = dict[sort_by];
    
    answer.sort((a, b) => a[sortIdx] - b[sortIdx]);
    
    return answer;
}