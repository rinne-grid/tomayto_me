import { ProjectTask } from "../../task/interfaces/ProjectTask";
import * as DOMStore from "./DOMStore";
import PomodoroTimer from "../classes/PomodoroTimer";
import { ToMayToMeConst } from "../../task/const/ToMayToMeConst";

// TODO: pomodoroTimer作成処理をもっときれいにできないか
// 作業開始～休憩ボタン押下前の超過の記録までを担っているため、コードが複雑になってしまっている
export function factoryPomodoroTimer(pomodoroButtonId: string) {
  // ポモドーロ実行ボタン押下時、対象ボタンIDから紐づくProjectTaskを取得する
  const projectTask: ProjectTask =
    DOMStore.getProjectTaskByDoPomodoroTargetId(pomodoroButtonId);

  return new PomodoroTimer(
    `#${ToMayToMeConst.POMODORO_TIMER_LANE}`,
    0.17,
    projectTask,
    true,
    ToMayToMeConst.POMODORO_STATUS_TIME_WORKING
  );
}

export function factoryPomodoroTimerFromProjectTask(projectTask: ProjectTask) {
  return new PomodoroTimer(
    `#${ToMayToMeConst.POMODORO_TIMER_LANE}`,
    0.17,
    projectTask,
    true,
    ToMayToMeConst.POMODORO_STATUS_TIME_WORKING
  );
}

export function factoryPomodoroTimerBreakTime(projectTask: ProjectTask) {
  const isCountDown = true;
  return new PomodoroTimer(
    `#${ToMayToMeConst.POMODORO_TIMER_LANE}`,
    0.2,
    projectTask,
    isCountDown,
    ToMayToMeConst.POMODORO_STATUS_TIME_BREAKING
  );
}
