<template>
  <div class="field">
    <label class="label" :for="inputControl.id">{{ inputControl.controlLabel ?? "" }}</label>
    <div class="control">
      <input
        class="input"
        :class="{ 'is-danger': !isValid && isTouched }"
        type="date"
        :id="inputControl.id"
        v-model.trim="controlValue"
        @focus.once="testControlValidity(controlValue, inputControl.validators)"
        @blur.once="wasTouched()" />
    </div>
    <p class="help is-danger empty-p">{{ !isValid && isTouched ? errorMessage : "" }}</p>
  </div>
</template>

<!-- TODO:
-Improve data type
-Check control validator
-Create validators for Date
-Create dateTime component
-->

<script setup lang="ts">
import useControlTouched from "@/core/hooks/controlTouched";
import useControlValidator from "@/core/hooks/controlValidator";
import { PropType, toRefs, watch } from "vue";
import { InputControl } from "./InputControl";

const emit = defineEmits(["isValid"]);
const props = defineProps({
  inputControl: { type: Object as PropType<InputControl>, required: true },
});
const { inputControl } = toRefs(props);
const controlValue = defineModel<string>({ required: true });

const { isValid, errorMessage, testControlValidity } = useControlValidator(controlValue, inputControl.value);
const { isTouched, wasTouched } = useControlTouched();

watch(isValid, () => {
  emit("isValid", isValid.value);
});
</script>
