import $ from "cash-dom";
import { ToMayToMeConst } from "../../task/const/ToMayToMeConst";
import { parseJKanbanTaskToProjectTask } from "../../task/functions/Kanban";
/***
 * 実行対象のポモドーロタスク情報を取得し、ProjectTaskのオブジェクトを返却します
 * @param targetId {string}
 * @return projectTask {ProjectTask}
 */
export function getProjectTaskByDoPomodoroTargetId(targetId: string) {
  // プレフィックスを取り除いて、カンバンIDを取得する
  const kanbanItemId = targetId.replace(
    ToMayToMeConst.PREFIX_ID_POMODORO_BTN,
    ""
  );

  // jKanban形式のタスク(dataset)を取得し、ProjectTask形式に変換する
  // @ts-ignore
  const kTask: JKanbanTask = window.kanban.findElement(kanbanItemId).dataset;
  return parseJKanbanTaskToProjectTask(kTask);
}

/***
 * 対象エレメントの表示状態を切り替えます
 * @param targetId
 * @param isHidden
 */
function toggleIsHidden(targetId: string, isHidden: boolean) {
  const elem = $(`#${targetId}`);
  if (isHidden) {
    elem.addClass("is-hidden");
  } else {
    elem.removeClass("is-hidden");
  }
}

/***
 * 休憩ボタンの有効状態を切り替えます
 * @param disabled
 */
export function toggleTimeLaneBreakButton(disabled: boolean) {
  $(`#${ToMayToMeConst.POMODORO_BUTTON_ID_BREAK}`).prop("disabled", disabled);
}

/***
 * 再開ボタンの表示状態を切り替えます
 * @param isHidden
 */
function toggleTimeLaneResumeButton(isHidden: boolean) {
  toggleIsHidden(ToMayToMeConst.POMODORO_BUTTON_ID_RESUME, isHidden);
}

/***
 * 一時停止ボタンの表示状態を切り替えます
 * @param isHidden
 */
function toggleTimeLanePauseButton(isHidden: boolean) {
  toggleIsHidden(ToMayToMeConst.POMODORO_BUTTON_ID_PAUSE, isHidden);
}

export function setTimeLaneColor(colorCode: string) {
  $(`#${ToMayToMeConst.POMODORO_TIMER_LANE} .values`).css("color", colorCode);
}

export function setTimerCounterDestroy(timeDisplay: string) {
  $(`#${ToMayToMeConst.POMODORO_TIMER_LANE} .values`).html(timeDisplay);
  setTimeLaneColor("");
}

/***
 * ポモドーロタイマーの状態を変更します
 * @param status
 */
export function changePomodoroStatus(status: string) {
  switch (status) {
    // 休憩の場合
    case ToMayToMeConst.POMODORO_STATUS_TIME_BREAKING:
      // 再開ボタンを表示する
      toggleTimeLaneResumeButton(false);
      // 休憩ボタンを無効にする
      toggleTimeLaneBreakButton(true);
      // 一時停止ボタンを非表示にする
      toggleTimeLanePauseButton(true);
      setTimeLaneColor(ToMayToMeConst.POMODORO_TIMER_LANE_COLOR_BREAKING);
      break;
    // 作業中の場合
    case ToMayToMeConst.POMODORO_STATUS_TIME_WORKING:
      // 再開ボタンを非表示にする
      toggleTimeLaneResumeButton(true);
      // 一時停止ボタンを表示する
      toggleTimeLanePauseButton(false);
      // 休憩ボタンを無効にする
      toggleTimeLaneBreakButton(true);
      setTimeLaneColor(ToMayToMeConst.POMODORO_TIMER_LANE_COLOR_WORKING);
      break;
    case ToMayToMeConst.POMODORO_STATUS_TIME_STOPPING:
      // 再開ボタンを表示にする
      toggleTimeLaneResumeButton(false);
      // 一時停止ボタンを非表示にする
      toggleTimeLanePauseButton(true);
      // 休憩ボタンを無効にする
      toggleTimeLaneBreakButton(true);
      setTimeLaneColor(ToMayToMeConst.POMODORO_TIMER_LANE_COLOR_WORKING);
      setTimerCounterDestroy("00:00:00");
      break;
  }
}
