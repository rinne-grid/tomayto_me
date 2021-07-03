import WebAPIService from "../../common/classes/WebAPIService";
import { ProjectTask } from "../../task/interfaces/ProjectTask";
import { MstUserPomodoroSetting } from "../interfaces/MstUserPomodoroSetting";
import { ToMayToMeConst } from "../../task/const/ToMayToMeConst";

export default class TimerService extends WebAPIService {
  public constructor() {
    super();
  }

  createTaskPomodoro(task: ProjectTask, timeMinutes: number): Promise<any> {
    const taskId = task.id;
    const projectId = task.project;
    return this.axios.post(
      `${ToMayToMeConst.API_END_POINT_TASKS_CRUD}/${projectId}/tasks/${taskId}/create_pomodoro/`,
      {
        task: taskId,
        time_minutes: timeMinutes,
      }
    );
  }

  getUserPomodoroSetting(): Promise<any> {
    return this.axios.get(
      `${ToMayToMeConst.API_END_POINT_USER_POMODORO_SETTING}/`
    );
  }
}
