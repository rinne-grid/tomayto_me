import { ToMayToMeConst } from "../const/ToMayToMeConst";
const axios = require("axios").default;

export default class TaskService {
  public getProjectTasks(projectId: number): Promise<any> {
    return axios.get(
      `${ToMayToMeConst.API_END_POINT_TASKS_CRUD}/${projectId}/tasks/`
    );
  }
}
