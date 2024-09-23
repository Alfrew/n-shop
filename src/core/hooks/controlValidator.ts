import { ModelRef, Ref, ref, watch } from "vue";
import { ControlValidators, InputControl } from "../components/inputs/InputControl";

export default function useControlValidator(controlValue: ModelRef<string | number | undefined>, inputControl: InputControl) {
  const isValid: Ref<boolean> = ref(false);
  const errorMessage: Ref<string> = ref("");

  watch(controlValue, function (newValue: string | number | undefined) {
    testControlValidity(newValue, inputControl.validators);
  });

  function testControlValidity(value: string | number | undefined, validators: ControlValidators): void {
    const mailRegExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const passwordRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    if (validators.required && !value && value !== 0) {
      errorMessage.value = "This field is required";
    } else if (value && validators.minLength && validators.minLength > String(value).length) {
      errorMessage.value = `Value should have a min characters length of: ${validators.minLength}`;
    } else if (value && validators.maxLength && validators.maxLength < String(value).length) {
      errorMessage.value = `Value exceed max characters length of: ${validators.maxLength}`;
    } else if (value && validators.minValue && validators.minValue > +value) {
      errorMessage.value = `Value is lower than min value: ${validators.minValue}`;
    } else if (value && validators.maxValue && validators.maxValue < +value) {
      errorMessage.value = `Value is higher than max value: ${validators.maxValue}`;
    } else if (value && validators.email && !mailRegExp.test(String(value))) {
      errorMessage.value = "Please input a valid email (example: johndoe@example.com)";
    } else if (value && validators.password && !passwordRegExp.test(String(value))) {
      errorMessage.value = "The password must contains at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)";
    } else if (value && validators.regex && validators.regex.test(String(value))) {
      errorMessage.value = validators.regexMessage ?? "The input value is invalid";
    } else {
      errorMessage.value = "";
    }
    isValid.value = !errorMessage.value;
  }

  return { isValid, errorMessage, testControlValidity };
}
