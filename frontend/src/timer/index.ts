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
import { toggleTimeLanePauseButton } from "./functions/DOMStore";

let pomodoroTimer: PomodoroTimer = null;

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
      pomodoroTimer = factoryPomodoroTimer(pomodoroButtonId);
    }
  );
  // 休憩ボタンクリック時
  $(document).on(
    "click",
    `#${ToMayToMeConst.POMODORO_BUTTON_ID_BREAK}`,
    (event: HTMLEvent<HTMLInputElement>) => {
      console.debug("休憩します");
      let targetTask = pomodoroTimer.getTargetTask();
      destroyPomodoroTimer();
      pomodoroTimer = factoryPomodoroTimerBreakTime(targetTask);
      // TODO: ボタン切り替えのコードが汚いため修正する
      const isHidden = false;
      DOMStore.toggleTimeLaneResumeButton(isHidden);
      const isDisabled = true;
      DOMStore.toggleTimeLaneBreakButton(isDisabled);
      const isHiddenPauseButton = true;
      DOMStore.toggleTimeLanePauseButton(isHiddenPauseButton);

      // TODO: Service経由でポモドーロ獲得処理(TaskPomodoroへの登録)を実行する
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
      pomodoroTimer = factoryPomodoroTimerFromProjectTask(targetTask);
      const isHidden = true;
      DOMStore.toggleTimeLaneResumeButton(isHidden);
      const isHiddenPauseButton = false;
      DOMStore.toggleTimeLanePauseButton(isHiddenPauseButton);
    }
  );
  // 一時停止ボタンクリック時
  $(document).on(
    "click",
    `#${ToMayToMeConst.POMODORO_BUTTON_ID_PAUSE}`,
    (event: HTMLEvent<HTMLInputElement>) => {
      // 一時停止中の場合
      if (pomodoroTimer.isPausing()) {
        pomodoroTimer.start();
        $(event.target).text("一時停止");
      } else {
        pomodoroTimer.pause();
        $(event.target).text("一時停止から再開");
      }
    }
  );
});
