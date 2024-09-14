<template>
  <div class="field">
    <label class="label" :for="inputControl.id">{{ inputControl.controlLabel ?? "" }}</label>
    <div class="control">
      <input
        class="input"
        :class="{ 'is-danger': !isValid && isTouched }"
        type="number"
        :id="inputControl.id"
        v-model.trim.number="controlValue"
        @focus.once="testControlValidity(controlValue, inputControl.validators)"
        @blur.once="wasTouched()" />
    </div>
    <p class="help is-danger empty-p">{{ !isValid && isTouched ? errorMessage : "" }}</p>
  </div>
</template>

<script setup lang="ts">
import useControlTouched from "@/core/hooks/controlTouched";
import { PropType, toRefs, watch } from "vue";
import { InputControl } from "./InputControl";
import useControlValidator from "@/core/hooks/controlValidator";

const emit = defineEmits(["isValid"]);
const props = defineProps({
  inputControl: { type: Object as PropType<InputControl>, required: true },
});
const { inputControl } = toRefs(props);
const controlValue = defineModel<number | undefined>({ required: true });

const { isValid, errorMessage, testControlValidity } = useControlValidator(controlValue, inputControl.value);
const { isTouched, wasTouched } = useControlTouched();

watch(isValid, () => {
  emit("isValid", isValid.value);
});
</script>
