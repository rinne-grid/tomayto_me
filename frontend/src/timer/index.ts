import $ from "cash-dom";

import PomodoroTimer from "./classes/PomodoroTimer";
import * as DOMStore from "./functions/DOMStore";
import {
  factoryPomodoroTimer,
  factoryPomodoroTimerBreakTime,
  factoryPomodoroTimerFromProjectTask,
} from "./functions/TimerFactory";
import { ToMayToMeConst } from "../task/const/ToMayToMeConst";
import { HTMLEvent } from "./interfaces/HTMLEvent";
import TimerService from "./services/TimerService";

let pomodoroTimer: PomodoroTimer = null;
const timerService = new TimerService();
// TODO: 重複コードを省くためとはいえ、グローバル変数の破棄をここでやるのはどうなのか
function destroyPomodoroTimer() {
  if (pomodoroTimer !== null) {
    pomodoroTimer.destroy();
  }
}

$(() => {
  // ポモドーロタイマーボタンクリック時
  $(document).on(
    "click",
    `[id^=${ToMayToMeConst.PREFIX_ID_POMODORO_BTN}]`,
    (event: HTMLEvent<HTMLInputElement>) => {
      const pomodoroButtonId = event.target.id;

      destroyPomodoroTimer();
      timerService
        .getUserPomodoroSetting()
        .then((result) => {
          pomodoroTimer = factoryPomodoroTimer(
            pomodoroButtonId,
            result.data[0].work_time
          );
          DOMStore.changePomodoroStatus(
            ToMayToMeConst.POMODORO_STATUS_TIME_WORKING
          );
        })
        .catch((err) => {
          console.debug(err.message);
        });
      // pomodoroTimer = factoryPomodoroTimer(pomodoroButtonId);
      // DOMStore.changePomodoroStatus(
      //   ToMayToMeConst.POMODORO_STATUS_TIME_WORKING
      // );
    }
  );
  // 休憩ボタンクリック時
  $(document).on(
    "click",
    `#${ToMayToMeConst.POMODORO_BUTTON_ID_BREAK}`,
    (event: HTMLEvent<HTMLInputElement>) => {
      console.debug("休憩します");
      let targetTask = pomodoroTimer.getTargetTask();

      // TODO: Service経由でポモドーロ獲得処理(TaskPomodoroへの登録)を実行する
      const timeMinutes = pomodoroTimer.getTotalTimeMinutes();

      timerService
        .createTaskPomodoro(targetTask, timeMinutes)
        .then((res) => {})
        .catch((err) => {
          console.error("timerService - createTaskPomodoroで失敗しました");
          console.error(err.response);
        });

      destroyPomodoroTimer();

      timerService
        .getUserPomodoroSetting()
        .then((result) => {
          pomodoroTimer = factoryPomodoroTimerBreakTime(
            targetTask,
            result.data[0].short_break_time
          );
          // 休憩状態に変更する
          DOMStore.changePomodoroStatus(
            ToMayToMeConst.POMODORO_STATUS_TIME_BREAKING
          );
        })
        .catch((err) => {});

      // pomodoroTimer = factoryPomodoroTimerBreakTime(targetTask);

      // 休憩状態に変更する
      // DOMStore.changePomodoroStatus(
      //   ToMayToMeConst.POMODORO_STATUS_TIME_BREAKING
      // );
    }
  );
  // 再開ボタンクリック時
  $(document).on(
    "click",
    `#${ToMayToMeConst.POMODORO_BUTTON_ID_RESUME}`,
    (event: HTMLEvent<HTMLInputElement>) => {
      console.debug("再開します");
      let targetTask = {};
      if (pomodoroTimer !== null) {
        targetTask = pomodoroTimer.getTargetTask();
        pomodoroTimer.destroy();
      }
      timerService
        .getUserPomodoroSetting()
        .then((result) => {
          pomodoroTimer = factoryPomodoroTimerFromProjectTask(
            targetTask,
            result.data[0].work_time
          );
          // 作業中状態に変更する
          DOMStore.changePomodoroStatus(
            ToMayToMeConst.POMODORO_STATUS_TIME_WORKING
          );
        })
        .catch((err) => {});

      // pomodoroTimer = factoryPomodoroTimerFromProjectTask(targetTask);
      // // 作業中状態に変更する
      // DOMStore.changePomodoroStatus(
      //   ToMayToMeConst.POMODORO_STATUS_TIME_WORKING
      // );
    }
  );
  // 一時停止ボタンクリック時
  $(document).on(
    "click",
    `#${ToMayToMeConst.POMODORO_BUTTON_ID_PAUSE}`,
    (event: HTMLEvent<HTMLInputElement>) => {
      // 一時停止中の場合
      if (pomodoroTimer.isPausing()) {
        pomodoroTimer.startFromPause();
        $(event.target).text("一時停止");
      } else {
        pomodoroTimer.pause();
        $(event.target).text("一時停止から再開");
      }
    }
  );
  // 終了ボタンクリック時
  $(document).on(
    "click",
    `#${ToMayToMeConst.POMODORO_BUTTON_ID_EXIT}`,
    (event: HTMLEvent<HTMLInputElement>) => {
      if (!pomodoroTimer.isStopping()) {
        DOMStore.changePomodoroStatus(
          ToMayToMeConst.POMODORO_STATUS_TIME_STOPPING
        );
        destroyPomodoroTimer();
      }
    }
  );
});
