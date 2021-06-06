import { Timer } from "easytimer.js";
import $ from "cash-dom";
import { ProjectTask } from "../../task/interfaces/ProjectTask";

export default class PomodoroTimer {
  private timer: Timer;
  private timerDomSelector: string;
  private targetTask: ProjectTask;
  // [1]TIME_STOPPING -> [2]TIME_WORKING -> [3]TIME_COMPLETED  -> [4]TIME_BREAKING -> [1] or [2]
  //                      |__ [3]TIME_PAUSING -> [1] or [2]
  private pomodoroStatus: string;

  constructor(
    timerDomSelector: string,
    minutes: number,
    targetTask: ProjectTask
  ) {
    this.timer = new Timer({
      countdown: true,
      startValues: { minutes: minutes },
    });
    this.timerDomSelector = timerDomSelector;
    this.targetTask = targetTask;
    this.initialize();
  }
  initialize() {
    // タイムレーンを表示し、タイマーのカウントダウンを開始する
    $(".time-lane").css("display", "block");
    this.refresh();
    this.timer.start();

    this.timer.addEventListener("secondsUpdated", (e) => {
      this.refresh();
    });
  }
  refresh() {
    $(`${this.timerDomSelector} .values`).html(
      this.timer.getTimeValues().toString()
    );
  }
  destroy() {
    this.timer.removeEventListener("secondsUpdated", () => {});
    this.timer.stop();
    this.timer = null;
  }
}
