export interface IconAction {
  iconName: string;
  tooltip: string;
}

export interface IconActionEvent {
  iconName: string;
  elementId: string;
}

export interface Column {
  dataKey: string;
  header: string;
  type?: ColumnType;
  icons?: IconAction[];
  url?: string;
  textAlign?: BulmaAlignClasses;
  prefix?: string;
}

type ColumnType = "link" | "action";
type BulmaAlignClasses = "has-text-left" | "has-text-right" | "has-text-centered" | "has-text-justified";
