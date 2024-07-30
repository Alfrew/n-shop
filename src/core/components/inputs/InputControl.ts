export interface InputControl {
  controlLabel?: string;
  validators: ControlValidators;
}

export interface ControlValidators {
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  email?: boolean;
  password?: boolean;
  regex?: RegExp;
  regexMessage?: string;
}
