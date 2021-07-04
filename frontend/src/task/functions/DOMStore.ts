import $ from "cash-dom";
import { ProjectTask } from "../interfaces/ProjectTask";
import { getDateStr, getTimeStr, isNotBlank } from "./Utility";
import { Window } from "../../@types/window";
import TaskService from "../services/TaskService";

/***
 * 現在表示しているプロジェクトのIDを返します
 * @returns {*|string}
 */
export function getProjectId(): string {
  // @ts-ignore
  return $("[name=current_project_id]").val();
}

/***
 * 現在選択されているボードIDを取得します
 * @returns {string|string[]}
 */
export function getBoardId(): string | string[] {
  return $("[name=todo_status_from_kanban]").val();
}

/***
 * 登録するタスクを取得します
 */
export function getTaskName(): string {
  // @ts-ignore
  return $("[name=todo_tasks]").val();
}

/***
 * 登録フォームをクリアします
 */
export function clearRegisterForm() {
  $("[name=todo_tasks]").val("");
  $("#todo_tasks_cancel_btn")[0].click();
}

/***
 * 詳細画面のタスクを取得します
 */
export function getDetailTask(): ProjectTask {
  let startDateTime = $("#edit_start_date_time").val() as string;
  let endDateTime = $("#edit_end_date_time").val() as string;
  const projectTask: ProjectTask = {
    id: $("#edit_task_id").val() as string,
    name: $("#edit_task_name").val() as string,
    memo: $("#edit_memo").val() as string,
    start_date_time: isNotBlank(startDateTime) ? new Date(startDateTime) : null,
    end_date_time: isNotBlank(endDateTime) ? new Date(endDateTime) : null,
  };
  return projectTask;
}

declare var window: Window;
/***
 * 詳細画面のタスクを設定します
 */
export function setDetailTask(projectTask: ProjectTask) {
  // タスクポモドーロ一覧を取得する
  const taskService = new TaskService();
  taskService
    .getTaskPomodoroList(projectTask)
    .then((result) => {
      console.debug(result.data);
      $("#pomodoro_list").empty();
      result.data.forEach((pomodoroObj: any) => {
        $("#pomodoro_list").append(
          `<div class='pomodoro_list_icon'>${pomodoroObj.time_minutes}</div>`
        );
      });
    })
    .catch((err) => {});

  $("#edit_task_id").val(projectTask.id);
  $("#edit_task_name").val(projectTask.name);
  $("#edit_memo").val(projectTask.memo);

  const startDateElem = document.querySelector("#edit_start_date_time");
  const endDateElem = document.querySelector("#edit_end_date_time");

  // @ts-ignore
  startDateElem.bulmaCalendar.date.start = projectTask.start_date_time;
  // @ts-ignore
  startDateElem.bulmaCalendar.time.start = projectTask.start_date_time;
  // @ts-ignore
  startDateElem.bulmaCalendar.save();

  // @ts-ignore
  endDateElem.bulmaCalendar.date.start = projectTask.end_date_time;
  // @ts-ignore
  endDateElem.bulmaCalendar.time.start = projectTask.end_date_time;
  // @ts-ignore
  endDateElem.bulmaCalendar.save();
}

window.setDetailTask = setDetailTask;
