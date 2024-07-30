import { InputControl } from "./InputControl";

export interface SelectControl extends InputControl {
  optionList: SelectOptionItem[];
}

export interface SelectOptionItem {
  value: string | number;
  label: string;
}
