/***
 * タスクに関係するフロント処理です
 */

//---------------------------------------------------------------------------------------------------------------------------------
// API通信
//---------------------------------------------------------------------------------------------------------------------------------
/***
 * プロジェクトに紐づくタスクをAPIから取得します
 * @param projectId
 * @returns {*}
 */
TOMAYTO_ME.tasks.getProjectTasks = function(projectId) {
    return axios.get(`${TOMAYTO_ME.API_END_POINT_TASKS_CRUD}/${projectId}/tasks/`)
}

//---------------------------------------------------------------------------------------------------------------------------------
//  データ変換
//---------------------------------------------------------------------------------------------------------------------------------
/***
 * カンバンのボードIDからステータスコードに変換します
 * @param boardId
 * @returns {string}
 */
TOMAYTO_ME.tasks.parseBoardIdToStatusCd = function(boardId) {
    let statusCd = "";
    switch(boardId) {
        case TOMAYTO_ME.BOARD_ID_TODO:
            statusCd = TOMAYTO_ME.STATUS_CD_TODO;
            break;
        case TOMAYTO_ME.BOARD_ID_WORKING:
            statusCd = TOMAYTO_ME.STATUS_CD_WORKING;
            break;
        case TOMAYTO_ME.BOARD_ID_COMPLETED:
            statusCd = TOMAYTO_ME.STATUS_CD_COMPLETE;
            break;
    }
    return statusCd;
}

/***
 * ステータスコードからカンバンのボードIDに変換します
 * @param statusCd
 * @returns {string}
 */
TOMAYTO_ME.tasks.parseStatusCdToBoardId = function(statusCd) {
    let boardId = "";
    switch(statusCd) {
        case TOMAYTO_ME.STATUS_CD_TODO:
            boardId = TOMAYTO_ME.BOARD_ID_TODO;
            break;
        case TOMAYTO_ME.STATUS_CD_WORKING:
            boardId = TOMAYTO_ME.BOARD_ID_WORKING;
            break;
        case TOMAYTO_ME.STATUS_CD_COMPLETE:
            boardId = TOMAYTO_ME.BOARD_ID_COMPLETED;
    }
    return boardId;
}

/***
 * DBモデルから取得した値をカンバンデータ形式に変換します
 * @param projectTaskList
 * @return {taskHash} data[boardId] = []
 */
TOMAYTO_ME.tasks.parseTaskModelToBoardItem = function(projectTaskList) {
    const taskBoardHash = {};
    // ボードID毎にタスクを振り分ける
    TOMAYTO_ME.BOARD_ITEM_LIST.forEach((boardId) => {
        taskBoardHash[boardId] = [];
    });
    projectTaskList.forEach((task) => {
        for(let i = 0; i < TOMAYTO_ME.BOARD_ITEM_LIST.length; i++) {
            const _boardId = TOMAYTO_ME.BOARD_ITEM_LIST[i];
            // 対象タスクのステータスとボードIDを比較し、一致したボードIDをキーとしてタスクを格納する
            if (TOMAYTO_ME.tasks.isStatusCdEqualsBoardId(task.status, _boardId)) {
                const taskObj = {
                    id: `${_boardId}-${task.id}`,
                    title: task.name,
                    status: task.status,
                    start_date_time: task.start_date_time,
                    end_date_time: task.end_date_time,
                    memo: task.memo,
                    project: task.project
                };
                taskBoardHash[_boardId].push(taskObj);
                break;
            }
        }
    });
    return taskBoardHash;
}

//---------------------------------------------------------------------------------------------------------------------------------
//  タスクに関係するメソッド
//---------------------------------------------------------------------------------------------------------------------------------
/***
 * 渡されたボードIDに紐づくステータスコードと対象データのステータスコードが等しいかどうかを判断します
 * @param boardId
 * @param statusCd
 * @returns {boolean}
 */
TOMAYTO_ME.tasks.isBoardIdEqualsStatusCd = function(boardId, statusCd) {
    return TOMAYTO_ME.tasks.parseBoardIdToStatusCd(boardId) === statusCd;
}

/***
 * 渡されたステータスコードに紐づくボードIDと対象データのボードIDが等しいかどうかを判断します
 * @param statusCd
 * @param boardId
 * @returns {boolean}
 */
TOMAYTO_ME.tasks.isStatusCdEqualsBoardId = function(statusCd, boardId) {
    return TOMAYTO_ME.tasks.parseStatusCdToBoardId(statusCd) === boardId;
}

/***
 * 現在表示しているプロジェクトのIDを返します
 * @returns {*|string|jQuery}
 */
TOMAYTO_ME.tasks.getProjectId = function() {
    return $("[name=current_project_id]").val();
}

/***
 * 現在選択されているボードIDを取得します
 * @returns {*|string|jQuery}
 */
TOMAYTO_ME.tasks.getBoardId = function() {
    return $("[name=todo_status_from_kanban]").val();
}

//---------------------------------------------------------------------------------------------------------------------------------
//  登録フォーム
//---------------------------------------------------------------------------------------------------------------------------------
TOMAYTO_ME.tasks.clearRegisterForm = function() {
    $("[name=todo_tasks]").val("");
    $("#todo_tasks_cancel_btn")[0].click();
}


//---------------------------------------------------------------------------------------------------------------------------------
//  カンバン操作
//---------------------------------------------------------------------------------------------------------------------------------
/***
 * カンバンにボードデータを追加します
 */
TOMAYTO_ME.tasks.addBoardDataToKanban = function(taskBoardHash) {
// カンバンに表示する
    Object.keys(taskBoardHash).forEach((key) => {
        if(taskBoardHash[key].length > 0) {
            taskBoardHash[key].forEach((taskObj) => {
                // ボードに存在しないものデータのみを追加対象とする
                if(kanban.findElement(taskObj.id) === null) {
                    kanban.addElement(key, taskObj);
                }
            })
        }
    });
}

/***
 * プロジェクトに紐づくタスクデータを取得し直します
 * @param projectId
 * @returns {Promise<void>}
 */
TOMAYTO_ME.tasks.refresh = async function(projectId) {

    try {
        // モデルデータを取得する
        const projectTaskObj = await TOMAYTO_ME.tasks.getProjectTasks(projectId);
        // モデルデータをボード形式のデータに変換する
        const taskBoardHash = TOMAYTO_ME.tasks.parseTaskModelToBoardItem(projectTaskObj.data);
        TOMAYTO_ME.tasks.addBoardDataToKanban(taskBoardHash);

    } catch(e) {
        console.error(e)
    }
}



$(function(){
    const projectId = TOMAYTO_ME.tasks.getProjectId()
    TOMAYTO_ME.tasks.refresh(projectId);

    // 作成ボタンクリック時にタスク登録を行います
    $("#todo_tasks_create_btn").on("click", (event) => {
        const taskName = $("[name=todo_tasks]").val();
        const boardId = TOMAYTO_ME.tasks.getBoardId();
        const status = TOMAYTO_ME.tasks.parseBoardIdToStatusCd(boardId);
        if(taskName !== undefined && taskName !== "") {
            axios.post(`${TOMAYTO_ME.API_END_POINT_TASKS_CRUD}/${projectId}/tasks/`,
                {
                    name: taskName,
                    status: status,
                    project: projectId
                }
            ).then((response) => {
                TOMAYTO_ME.tasks.refresh(projectId);
                TOMAYTO_ME.tasks.clearRegisterForm();
            }).catch((error) => {
                console.error(error);
            });
        }
    });
});

