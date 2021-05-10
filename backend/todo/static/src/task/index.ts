import TaskService from "./services/TaskService";
import $ from "cash-dom";

$(() => {
  console.log("Hello TypeScript");
  const taskService: TaskService = new TaskService();
  taskService
    .getProjectTasks(5)
    .then((response) => {
      console.log(response);
      console.log("TypeScriptから実行です");
    })
    .catch((error) => {
      console.log("TypeScriptから実行エラーです");
    });
});
