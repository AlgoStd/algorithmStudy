function solution(friends, gifts) {
  const n = friends.length;

  // 1. 초기화
  const name2idx = new Map(friends.map((name, idx) => [name, idx]));
  const giftRecord = Array.from({ length: n }, () => Array(n).fill(0));
  const giftScore = Array(n).fill(0);
  const nextGifts = Array(n).fill(0);

  // 2. 기록 연산
  for (const gift of gifts) {
    const [giver, receiver] = gift.split(" ");

    const gIdx = name2idx.get(giver);
    const rIdx = name2idx.get(receiver);

    giftRecord[gIdx][rIdx]++;
    giftRecord[rIdx][gIdx]--;

    giftScore[gIdx]++;
    giftScore[rIdx]--;
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (giftRecord[i][j] > 0) {
        nextGifts[i]++;
      } else if (giftRecord[i][j] < 0) {
        nextGifts[j]++;
      } else {
        if (giftScore[i] > giftScore[j]) nextGifts[i]++;
        else if (giftScore[i] < giftScore[j]) nextGifts[j]++;
      }
    }
  }

  return Math.max(...nextGifts);
}
