import TaskService from "./services/TaskService";
import * as DOMStore from "./functions/DOMStore";
import $ from "cash-dom";
import * as Kanban from "./functions/Kanban";
import { ProjectTask } from "./interfaces/ProjectTask";

$(() => {
  const projectId = DOMStore.getProjectId();
  // カンバンデータの初期表示
  Kanban.refresh(projectId)
    .then(() => {})
    .catch((error) => {
      console.error(error.response);
    });

  const taskService: TaskService = new TaskService();

  // 作成ボタンクリック時にタスク登録を行います
  $("#todo_tasks_create_btn").on("click", () => {
    const boardId = DOMStore.getBoardId();
    const task: ProjectTask = {
      name: DOMStore.getTaskName(),
      status: Kanban.parseBoardIdToStatusCd(boardId),
      project: projectId,
    };

    if (task.name !== undefined && task.name !== "") {
      // タスク登録実行
      taskService
        .createProjectTask(task)
        .then(() => {
          // タスク登録に成功したらカンバンのデータを更新する
          Kanban.refresh(projectId)
            .then(() => {})
            .catch((error) => console.error(error.response));
          // 登録フォームの情報をクリアする
          DOMStore.clearRegisterForm();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  $("[id^=pomodorobtn]").on("click", (elem: any) => {
    console.debug(elem);
  });
});
