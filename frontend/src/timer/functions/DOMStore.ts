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
