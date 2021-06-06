import $ from "cash-dom";

import PomodoroTimer from "./classes/PomodoroTimer";
import * as DOMStore from "./functions/DOMStore";

import { ProjectTask } from "../task/interfaces/ProjectTask";
import { ToMayToMeConst } from "../task/const/ToMayToMeConst";
import { getProjectTaskByDoPomodoroTargetId } from "./functions/DOMStore";

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
}

let pomodoroTimer: PomodoroTimer = null;
$(() => {
  $(document).on(
    "click",
    `[id^=${ToMayToMeConst.PREFIX_ID_POMODORO_BTN}]`,
    (event: HTMLEvent<HTMLInputElement>) => {
      const pomodoroButtonId = event.target.id;

      // ポモドーロ実行ボタン押下時、対象ボタンIDから紐づくProjectTaskを取得する
      const projectTask: ProjectTask =
        DOMStore.getProjectTaskByDoPomodoroTargetId(pomodoroButtonId);

      console.debug(projectTask);

      if (pomodoroTimer !== null) {
        pomodoroTimer.destroy();
      }
      pomodoroTimer = new PomodoroTimer("#pomodoro_timer", 2, projectTask);
    }
  );
});
