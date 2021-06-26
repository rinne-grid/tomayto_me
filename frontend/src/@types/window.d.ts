import { JKanbanTask } from "../task/interfaces/JKanbanTask";
import { ProjectTask } from "../task/interfaces/ProjectTask";

interface Window {
  parseJKanbanTaskToProjectTask(jKanbanTask: JKanbanTask): ProjectTask;
  setDetailTask(projectTask: ProjectTask): void;
}
