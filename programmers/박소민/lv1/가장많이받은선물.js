function solution(friends, gifts) {
  const n = friends.length;
  var answer = 0;

  // 해시맵을 통해서 friend에 따른 인덱스 생성
  const friendsDict = new Map();

  for (let i = 0; i < n; i++) {
    friendsDict.set(friends[i], i);
  }

  const friendsMap = Array.from({ length: n }, () => Array(n).fill(0));
  const friendsNum = Array(n).fill(0);

  for (const gift of gifts) {
    const [A, B] = gift.split(" ");

    const ai = friendsDict.get(A);
    const bi = friendsDict.get(B);

    friendsMap[ai][bi]++;
    friendsMap[bi][ai]--;

    friendsNum[ai]++;
    friendsNum[bi]--;
  }

  const result = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (friendsMap[i][j] !== 0) {
        const nextFriend = friendsMap[i][j] > 0 ? i : j;
        result[nextFriend]++;
      } else {
        const iNum = friendsNum[i];
        const jNum = friendsNum[j];

        if (iNum === jNum) continue;
        else {
          const nextFriend = iNum > jNum ? i : j;
          result[nextFriend]++;
        }
      }
    }
  }

  for (const val of result) {
    if (val > answer) {
      answer = val;
    }
  }

  return answer;
}
