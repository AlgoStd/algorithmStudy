const toMin = (time) => {
  return Math.floor(time / 100) * 60 + (time % 100);
};

function solution(schedules, timelogs, startday) {
  const n = schedules.length;
  var answer = 0;

  for (let i = 0; i < n; i++) {
    schedules[i] = toMin(schedules[i]);
  }

  for (let i = 0; i < n; i++) {
    const schedule = schedules[i] + 10;

    let onTime = true;

    for (let day = 0; day < 7; day++) {
      const today = (startday + day) % 7;

      if (today === 6 || today === 0) continue;
      if (toMin(timelogs[i][day]) > schedule) {
        onTime = false;
        break;
      }
    }

    if (onTime) answer++;
  }

  return answer;
}
