import TaskService from "./services/TaskService";
import {
  clearRegisterForm,
  getBoardId,
  getProjectId,
} from "./functions/dom_store";
import $ from "cash-dom";
import { parseBoardIdToStatusCd, refresh } from "./functions/kanban";
import { ToMayToMeConst } from "./const/ToMayToMeConst";
import { factoryAxios } from "./functions/utility";

$(() => {
  console.log("Hello TypeScript");
  const taskService: TaskService = new TaskService();
  taskService
    .getProjectTasks("5")
    .then((response) => {
      console.log(response);
      console.log("TypeScriptから実行です");
    })
    .catch((error) => {
      console.log("TypeScriptから実行エラーです");
    });

  const projectId = getProjectId();
  refresh(projectId);

  // 作成ボタンクリック時にタスク登録を行います
  $("#todo_tasks_create_btn").on("click", (event) => {
    const taskName = $("[name=todo_tasks]").val();
    const boardId = getBoardId();
    const status = parseBoardIdToStatusCd(boardId);
    if (taskName !== undefined && taskName !== "") {
      const axios = factoryAxios();
      axios
        .post(
          `${ToMayToMeConst.API_END_POINT_TASKS_CRUD}/${projectId}/tasks/`,
          {
            name: taskName,
            status: status,
            project: projectId,
          }
        )
        .then((response) => {
          refresh(projectId);
          clearRegisterForm();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
});
