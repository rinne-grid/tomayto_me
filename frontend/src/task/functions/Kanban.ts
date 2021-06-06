import { ToMayToMeConst } from "../const/ToMayToMeConst";
import { ProjectTask } from "../interfaces/ProjectTask";
import { JKanbanTask } from "../interfaces/JKanbanTask";
import TaskService from "../services/TaskService";
import { isNotBlank } from "./Utility";

/***
 * カンバンのボードIDからステータスコードに変換します
 * @param boardId
 * @returns {string}
 */
export function parseBoardIdToStatusCd(boardId: string | string[]) {
  let statusCd = "";

  switch (boardId) {
    case ToMayToMeConst.BOARD_ID_TODO:
      statusCd = ToMayToMeConst.STATUS_CD_TODO;
      break;
    case ToMayToMeConst.BOARD_ID_WORKING:
      statusCd = ToMayToMeConst.STATUS_CD_WORKING;
      break;
    case ToMayToMeConst.BOARD_ID_COMPLETED:
      statusCd = ToMayToMeConst.STATUS_CD_COMPLETE;
      break;
  }
  return statusCd;
}

/***
 * ステータスコードからカンバンのボードIDに変換します
 * @param statusCd
 * @returns {string}
 */
export function parseStatusCdToBoardId(statusCd: string) {
  let boardId = "";
  switch (statusCd) {
    case ToMayToMeConst.STATUS_CD_TODO:
      boardId = ToMayToMeConst.BOARD_ID_TODO;
      break;
    case ToMayToMeConst.STATUS_CD_WORKING:
      boardId = ToMayToMeConst.BOARD_ID_WORKING;
      break;
    case ToMayToMeConst.STATUS_CD_COMPLETE:
      boardId = ToMayToMeConst.BOARD_ID_COMPLETED;
  }
  return boardId;
}

/***
 * DBモデルから取得した値をカンバンデータ形式に変換します
 * @param projectTaskList
 * @return {[key: string]: ProjectTask[]}
 */
export function parseTaskModelToBoardItem(projectTaskList: ProjectTask[]) {
  const taskBoardHash: { [key: string]: ProjectTask[] } = {};
  // ボードID毎にタスクを振り分ける
  ToMayToMeConst.BOARD_ITEM_LIST.forEach((boardId) => {
    taskBoardHash[boardId] = [];
  });
  projectTaskList.forEach((task) => {
    for (let i = 0; i < ToMayToMeConst.BOARD_ITEM_LIST.length; i++) {
      const _boardId = ToMayToMeConst.BOARD_ITEM_LIST[i];
      // 対象タスクのステータスとボードIDを比較し、一致したボードIDをキーとしてタスクを格納する
      if (isStatusCdEqualsBoardId(task.status, _boardId)) {
        const taskObj = {
          id: `${_boardId}-${task.id}`,
          title: `
          <div class="box is-align-content-end">
            <button id='pomodorobtn-${_boardId}-${task.id}' class='button is-rounded is-danger is-small'>T</button>
            <div>${task.name}</div>
          </div>
          `,
          name: task.name, // jKanban Dataset用
          status: task.status,
          start_date_time: task.start_date_time,
          end_date_time: task.end_date_time,
          memo: task.memo,
          project: task.project,
          order_no: task.order_no,
        };
        taskBoardHash[_boardId].push(taskObj);
        break;
      }
    }
  });
  return taskBoardHash;
}

/***
 * 渡されたボードIDに紐づくステータスコードと対象データのステータスコードが等しいかどうかを判断します
 * @param boardId
 * @param statusCd
 * @returns {boolean}
 */
export function isBoardIdEqualsStatusCd(boardId: string, statusCd: string) {
  return parseBoardIdToStatusCd(boardId) === statusCd;
}

/***
 * 渡されたステータスコードに紐づくボードIDと対象データのボードIDが等しいかどうかを判断します
 * @param statusCd
 * @param boardId
 * @returns {boolean}
 */
export function isStatusCdEqualsBoardId(statusCd: string, boardId: string) {
  return parseStatusCdToBoardId(statusCd) === boardId;
}

/***
 * カンバンにボードデータを追加します
 */
export function addBoardDataToKanban(taskBoardHash: {
  [key: string]: ProjectTask[];
}) {
  // カンバンに表示する
  Object.keys(taskBoardHash).forEach((key) => {
    if (taskBoardHash[key].length > 0) {
      taskBoardHash[key].forEach((taskObj) => {
        // ボードに存在しないものデータのみを追加対象とする
        // @ts-ignore
        if (window.kanban.findElement(taskObj.id) === null) {
          // @ts-ignore
          window.kanban.addElement(key, taskObj);
        }
      });
    }
  });
}

/***
 * プロジェクトに紐づくタスクデータを取得し直します
 * @param projectId
 * @returns {Promise<void>}
 */
export async function refresh(projectId: string | string[]) {
  try {
    // モデルデータを取得する
    const taskService = new TaskService();
    const projectTaskObj = await taskService.getProjectTasks(projectId);
    // モデルデータをボード形式のデータに変換する
    const taskBoardHash = parseTaskModelToBoardItem(projectTaskObj.data);
    addBoardDataToKanban(taskBoardHash);
  } catch (e) {
    console.error(e);
  }
}

/***
 * カンバンタスクからアプリケーションのProjectTaskに変換します
 * @param {JKanbanTask} jKanbanTask
 * @return {ProjectTask} projectTask
 */
export function parseJKanbanTaskToProjectTask(jKanbanTask: JKanbanTask) {
  let startDateTimeStr = jKanbanTask.start_date_time;
  let endDateTimeStr = jKanbanTask.end_date_time;

  const projectTask: ProjectTask = {
    id: jKanbanTask.eid,
    name: jKanbanTask.name,
    title: jKanbanTask.name,
    status: jKanbanTask.status,
    // 開始時刻、終了時刻が有効な日付であれば日付を渡し、それ以外はnullとする
    start_date_time: isNotBlank(startDateTimeStr)
      ? new Date(startDateTimeStr)
      : null,
    end_date_time: isNotBlank(endDateTimeStr) ? new Date(endDateTimeStr) : null,
    memo: jKanbanTask.memo,
    project: jKanbanTask.project,
    order_no: jKanbanTask.order_no,
  };
  return projectTask;
}
