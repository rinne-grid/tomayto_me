import { ToMayToMeConst } from "../const/ToMayToMeConst";
import { factoryAxios } from "../functions/utility";

export default class TaskService {
  public getProjectTasks(projectId: string | string[]): Promise<any> {
    const axios = factoryAxios();
    return axios.get(
      `${ToMayToMeConst.API_END_POINT_TASKS_CRUD}/${projectId}/tasks/`
    );
  }
}
