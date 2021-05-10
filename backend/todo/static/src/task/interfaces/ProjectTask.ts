export interface ProjectTask {
  id: number;
  title: string;
  status: string;
  start_date_time: Date;
  end_date_time: Date;
  memo: string;
  project: number;
}
