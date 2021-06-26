import axios from "axios";
import { ProjectTask } from "../interfaces/ProjectTask";

/***
 * DjangoのXSRFヘッダ・トークン情報を与えたaxiosオブジェクトを返します。
 * @return {axios}
 */
export function factoryAxios() {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  return axios;
}

/***
 * 受け取った文字列がブランクやnullでないかどうか検証します
 * @param targetValue
 */
export function isNotBlank(targetValue: string) {
  return (
    targetValue !== "" &&
    targetValue !== "null" &&
    targetValue !== null &&
    targetValue !== undefined
  );
}

/***
 * ProjectTaskとカンバンタスクの差分の有無を確認します
 */
export function isExistDiffProjectKanbanTask(
  projectTask: ProjectTask,
  kanbanTask: ProjectTask
) {
  return (
    projectTask.name !== kanbanTask.name ||
    projectTask.memo !== kanbanTask.memo ||
    projectTask.start_date_time !== kanbanTask.start_date_time ||
    projectTask.end_date_time !== kanbanTask.end_date_time
  );
}

/***
 * Dateオブジェクトから日付文字を返します
 * @param date {Date}
 * @param separator {string}
 * @return string "yyyy-mm-dd"
 */
export function getDateStr(date: Date, separator: string = "-"): string {
  return `${date.getFullYear()}${separator}${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}${separator}${("0" + date.getDate()).slice(-2)}`;
}

/***
 * Dateオブジェクトから時刻文字を返します
 * @param date {Date}
 * @param separator {string}
 * @return string "hh24:mm"
 */
export function getTimeStr(date: Date, separator: string = ":"): string {
  return `${("0" + date.getHours()).slice(-2)}${separator}${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
}
