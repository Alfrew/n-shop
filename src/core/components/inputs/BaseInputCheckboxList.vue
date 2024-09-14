<template>
  <div class="field">
    <label class="label" :for="inputSelectControl.id">{{ inputSelectControl.controlLabel ?? "Select an option" }}</label>
    <div class="control">
      <div class="checkboxes">
        <label class="checkbox" v-for="option in inputSelectControl.optionList" :key="option.value">
          <input type="checkbox" :name="inputSelectControl.id" :value="option.value" v-model.trim="controlValue" :aria-label="option.label" />
          {{ option.label }}
        </label>
      </div>
      <!-- <p class="help is-danger empty-p">{{ !isValid && isTouched ? errorMessage : "" }}</p> -->
    </div>
  </div>
</template>

<!-- TODO:
-Implement control validator
-Create validators for checkbox list
-->

<script setup lang="ts">
// import useControlTouched from "@/core/hooks/controlTouched";
// import useControlValidator from "@/core/hooks/controlValidator";
import { PropType, toRefs, watch } from "vue";
import { SelectControl } from "./SelectControl";

const emit = defineEmits(["isValid"]);
const props = defineProps({
  inputSelectControl: { type: Object as PropType<SelectControl>, required: true },
});
const { inputSelectControl } = toRefs(props);
const controlValue = defineModel<string[] | undefined>({ required: true });

// const { isValid, errorMessage, testControlValidity } = useControlValidator(controlValue, inputSelectControl.value);
// const { isTouched, wasTouched } = useControlTouched();

// watch(isValid, () => {
//   emit("isValid", isValid.value);
// });
</script>

<style scoped lang="scss">
.control .checkboxes .checkbox {
  display: block;
  margin-left: 0;
}
</style>
