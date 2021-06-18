import { ToMayToMeConst } from "../const/ToMayToMeConst";
import { ProjectTask } from "../interfaces/ProjectTask";
import WebAPIService from "../../common/classes/WebAPIService";

export default class TaskService extends WebAPIService {
  public constructor() {
    super();
  }

  /***
   * プロジェクトIDに紐づくタスク情報を取得します
   * @param projectId
   * @return {Promise}
   */
  public getProjectTasks(projectId: string | string[]): Promise<any> {
    return this.axios.get(
      `${ToMayToMeConst.API_END_POINT_TASKS_CRUD}/${projectId}/tasks/`
    );
  }

  /***
   * 画面から受け取ったタスク情報を登録します
   * @param task
   * @return Promise
   */
  public createProjectTask(task: ProjectTask): Promise<any> {
    return this.axios.post(
      `${ToMayToMeConst.API_END_POINT_TASKS_CRUD}/${task.project}/tasks/`,
      {
        name: task.name,
        status: task.status,
        project: task.project,
      }
    );
  }
}
