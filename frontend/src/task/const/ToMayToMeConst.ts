export class ToMayToMeConst {
  public static API_END_POINT_TASKS_CRUD = "/api/projects";
  public static BOARD_ID_TODO = "todo_board";
  public static BOARD_ID_WORKING = "working_board";
  public static BOARD_ID_COMPLETED = "completed_board";
  public static STATUS_CD_TODO = "TODO";
  public static STATUS_CD_WORKING = "WORKING";
  public static STATUS_CD_COMPLETE = "COMPLETE";

  public static BOARD_ITEM_LIST = [
    ToMayToMeConst.BOARD_ID_TODO,
    ToMayToMeConst.BOARD_ID_WORKING,
    ToMayToMeConst.BOARD_ID_COMPLETED,
  ];

  // ポモドーロボタンプレフィックス
  public static PREFIX_ID_POMODORO_BTN = "pomodorobtn-";
}
