import $ from "cash-dom";

/***
 * 現在表示しているプロジェクトのIDを返します
 * @returns {*|string|string[]}
 */
export function getProjectId(): string|string[] {
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
 * 登録フォームをクリアします
 */
export function clearRegisterForm () {
    $("[name=todo_tasks]").val("");
    $("#todo_tasks_cancel_btn")[0].click();
}
