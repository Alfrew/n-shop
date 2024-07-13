import { ModelRef, Ref, ref, watch } from 'vue';

export default function useControlValidator(inputControl: ModelRef<string>, regexp: RegExp) {
  const isValid: Ref<boolean> = ref(false);

  watch(inputControl, function (newValue: string) {
    isValid.value = regexp.test(newValue);
  });

  return { isValid };
}
