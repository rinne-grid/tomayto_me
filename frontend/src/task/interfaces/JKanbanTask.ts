export interface JKanbanTask extends DOMStringMap {
  eid?: string;
  name?: string;
  title?: string;
  status?: string;
  start_date_time?: string;
  end_date_time?: string;
  memo?: string;
  project?: string;
  order_no?: string;
}
