/*
출근 희망 시각 + 10분 (주말 제외)
매일 한 번씩만 출근
모든 시각은 시에 100을 곱하고 분을 더한 정수

-> 일주일 동안 늦지 않고 출근

설계
1. 시간복잡도 o(n) 방식으로 설계. timelogs를 한 번만 순회
직원 수만큼의 boolean 배열
schedules를 미리 출근 시간으로 변경
forEach 분 + 10
엣지 케이스 (필요할까?)
1) 분 + 10 >= 60인 경우 -> 시 + 1, 분 - 60
2) 시 >= 24인 경우 -> 시 - 24

23시 48분이 출근시간
23시 58분 마감시간
00시 00분 출근이라면...

2. 주말인 경우(6, 7) continue
2.1. 아닌 경우 내부 배열을 순회하면서 확인

3. true 값의 갯수 반환
*/

function solution(schedules, timelogs, startday) {
  const n = schedules.length;
  const deadline = schedules.map((v) => {
    let hour = parseInt(v / 100);
    let minutes = (v % 100) + 10;

    if (minutes >= 60) {
      hour++;
      minutes -= 60;
    }

    // 나중에
    if (hour >= 24) {
      hour -= 24;
    }

    return hour * 100 + minutes;
  });

  const onTime = Array(n).fill(true);

  for (let worker = 0; worker < n; worker++) {
    let currentDay = startday;

    for (const time of timelogs[worker]) {
      const isWeekend = currentDay % 7 === 0 || currentDay % 7 === 6;
      if (isWeekend) {
        currentDay++;
        continue;
      }

      if (!onTime[worker]) continue;

      if (time > deadline[worker]) {
        onTime[worker] = false;
      }

      currentDay++;
    }
  }

  return onTime.filter((v) => v === true).length;
}
