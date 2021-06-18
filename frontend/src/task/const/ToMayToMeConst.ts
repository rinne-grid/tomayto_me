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
  public static POMODORO_STATUS_TIME_STOPPING = "TIME_STOPPING";
  public static POMODORO_STATUS_TIME_WORKING = "TIME_WORKING";
  public static POMODORO_STATUS_TIME_BREAKING = "TIME_BREAKING";
  public static POMODORO_STATUS_TIME_PAUSING = "TIME_PAUSING";
  public static POMODORO_BUTTON_ID_BREAK = "break_pomodoro";
  public static POMODORO_BUTTON_ID_RESUME = "resume_pomodoro";
  public static POMODORO_BUTTON_ID_PAUSE = "pause_pomodoro";
  public static POMODORO_BUTTON_ID_EXIT = "exit_pomodoro";

  public static POMODORO_TIMER_LANE = "pomodoro_timer";

  public static POMODORO_TIMER_LANE_COLOR_WORKING = "#4a4a4a";
  public static POMODORO_TIMER_LANE_COLOR_BREAKING = "#00d1b2";
  public static POMODORO_TIMER_LANE_COLOR_OVER_WORK = "tomato";
}
