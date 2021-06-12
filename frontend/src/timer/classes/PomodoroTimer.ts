import $ from "cash-dom";
import { Timer, TimerEvent } from "easytimer.js";
import { ProjectTask } from "../../task/interfaces/ProjectTask";
import { ToMayToMeConst } from "../../task/const/ToMayToMeConst";
import * as DOMStore from "../functions/DOMStore";

export default class PomodoroTimer {
  private timer: Timer;
  private timerDomSelector: string;
  private targetTask: ProjectTask;
  // [1]TIME_STOPPING -> [2]TIME_WORKING -> [3]TIME_COMPLETED  -> [4]TIME_BREAKING -> [1] or [2]
  //                      |__ [3]TIME_PAUSING -> [1] or [2]
  private pomodoroStatus: string;
  private timerBaseMinutes: number;

  /***
   * 対象タスクのタイマーを生成する
   * @param timerDomSelector {string}
   * @param minutes {number}
   * @param targetTask {ProjectTask}
   * @param countdown {boolean}
   * @param pomodoroStatus {string}
   */
  constructor(
    timerDomSelector: string,
    minutes: number,
    targetTask: ProjectTask,
    countdown: boolean = true,
    pomodoroStatus: string = ToMayToMeConst.POMODORO_STATUS_TIME_WORKING
  ) {
    this.timer = new Timer({
      countdown: countdown,
      startValues: { minutes: minutes },
    });
    this.timerDomSelector = timerDomSelector;
    this.targetTask = targetTask;
    this.timerBaseMinutes = minutes;
    this.pomodoroStatus = pomodoroStatus;
    this.initialize();
  }

  /***
   * タイマーを開始する前の初期設定を行う
   */
  initialize() {
    // タイムレーンを表示し、タイマーのカウントダウンを開始する
    $(".time-lane").css("display", "block");
    this.refresh();
    this.start();

    this.setRefreshHandler();
    this.setAchievedHandler();
  }

  /***
   * タイマーを開始する
   */
  start() {
    this.timer.start();
    this.pomodoroStatus = ToMayToMeConst.POMODORO_STATUS_TIME_WORKING;
  }

  /***
   * タイマーを停止する
   */
  refresh() {
    $(`${this.timerDomSelector} .values`).html(
      this.timer.getTimeValues().toString()
    );
  }

  /***
   * タイマーを停止する
   */
  stop() {
    this.pomodoroStatus = ToMayToMeConst.POMODORO_STATUS_TIME_STOPPING;
    this.timer.stop();
  }

  /***
   * タイマーを一時停止する
   */
  pause() {
    this.pomodoroStatus = ToMayToMeConst.POMODORO_STATUS_TIME_PAUSING;
    this.timer.pause();
  }

  /***
   * タイマーを再開する
   *
   */
  resume() {
    this.pomodoroStatus = ToMayToMeConst.POMODORO_STATUS_TIME_WORKING;
    this.timer.reset();
  }

  /***
   * タイマーをクリアする
   */
  destroy() {
    this.timer.removeEventListener("secondsUpdated", () => {});
    this.stop();
    this.timer = null;
  }

  isPausing() {
    return this.pomodoroStatus === ToMayToMeConst.POMODORO_STATUS_TIME_PAUSING;
  }

  /***
   * ポモドーロ実行対象のタスクを取得する
   * @return targetTask {ProjectTask}
   */
  getTargetTask() {
    return this.targetTask;
  }

  /***
   * 秒経過時にリフレッシュするためのハンドラーをセットする
   */
  setRefreshHandler() {
    this.timer.addEventListener("secondsUpdated", (e: TimerEvent) => {
      this.refresh();
    });
  }

  /***
   * タイマーの時間計測終了時に呼び出すハンドラーをセットする
   */
  setAchievedHandler() {
    this.timer.addEventListener("targetAchieved", (e: TimerEvent) => {
      // 現在作業中の場合、超過時間の記録を開始する
      if (this.pomodoroStatus === ToMayToMeConst.POMODORO_STATUS_TIME_WORKING) {
        console.debug("超過時間の記録を開始します");

        DOMStore.toggleTimeLaneBreakButton(false);
        // タイマー完了時に、基準時間を元にカウントアップを開始する
        this.timer = new Timer({
          countdown: false,
          startValues: { minutes: this.timerBaseMinutes },
        });
        this.start();
        this.setRefreshHandler();
      }
    });
  }
}
