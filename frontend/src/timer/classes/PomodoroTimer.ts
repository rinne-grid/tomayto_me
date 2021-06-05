import { Timer } from "easytimer.js";
import $ from "cash-dom";

export default class PomodoroTimer {
  private timer: Timer;
  private timerDomSelector: string;

  constructor(timerDomSelector: string, minutes: number) {
    this.timer = new Timer({
      countdown: true,
      startValues: { minutes: minutes },
    });
    this.timerDomSelector = timerDomSelector;
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
}
