import $ from "cash-dom";

import PomodoroTimer from "./classes/PomodoroTimer";

$(() => {
  console.debug("start");
  $(document).on("click", "[id^=pomodorobtn-]", (event: MouseEvent) => {
    console.debug(event.target);
    let timer = new PomodoroTimer("#pomodoro_timer", 2);
  });
});
