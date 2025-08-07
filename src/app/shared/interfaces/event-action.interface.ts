import { Column } from "../components/molecules/table-data/table-data.component";

export interface IActionEvent {
  action: string;
  column: Column;
  row: any;
}
