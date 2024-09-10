<template>
  <div class="field">
    <label class="label" :for="inputSelectControl.id">{{ inputSelectControl.controlLabel ?? "Select an option" }}</label>
    <div class="control">
      <div class="select is-fullwidth" :class="{ 'is-danger': !isValid && isTouched }">
        <select
          :id="inputSelectControl.id"
          v-model.trim="controlValue"
          @focus.once="testControlValidity(controlValue, inputSelectControl.validators)"
          @blur.once="wasTouched()">
          <option v-for="option in inputSelectControl.optionList" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </div>
      <p class="help is-danger empty-p">{{ !isValid && isTouched ? errorMessage : "" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useControlTouched from "@/core/hooks/controlTouched";
import useControlValidator from "@/core/hooks/controlValidator";
import { PropType, toRefs, watch } from "vue";
import { SelectControl } from "./SelectControl";

const emit = defineEmits(["isValid"]);
const props = defineProps({
  inputSelectControl: { type: Object as PropType<SelectControl>, required: true },
});
const { inputSelectControl } = toRefs(props);
const controlValue = defineModel<string>({ required: true });

const { isValid, errorMessage, testControlValidity } = useControlValidator(controlValue, inputSelectControl.value);
const { isTouched, wasTouched } = useControlTouched();

watch(isValid, () => {
  emit("isValid", isValid.value);
});
</script>
