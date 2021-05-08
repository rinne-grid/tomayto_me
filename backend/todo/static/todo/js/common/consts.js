if(!window.hasOwnProperty("TOMAYTO_ME")) {
    window.TOMAYTO_ME = {};
    window.TOMAYTO_ME["tasks"] = {};
}

window.TOMAYTO_ME.API_END_POINT_TASKS_CRUD = "/api/projects";

window.TOMAYTO_ME.BOARD_ID_TODO = "todo_board";
window.TOMAYTO_ME.BOARD_ID_WORKING = "working_board";
window.TOMAYTO_ME.BOARD_ID_COMPLETED = "completed_board";

window.TOMAYTO_ME.STATUS_CD_TODO = "TODO";
window.TOMAYTO_ME.STATUS_CD_WORKING = "WORKING";
window.TOMAYTO_ME.STATUS_CD_COMPLETE = "COMPLETE";

window.TOMAYTO_ME.BOARD_ITEM_LIST = [
    window.TOMAYTO_ME.BOARD_ID_TODO,
    window.TOMAYTO_ME.BOARD_ID_WORKING,
    window.TOMAYTO_ME.BOARD_ID_COMPLETED
];
