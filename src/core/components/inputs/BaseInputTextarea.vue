<template>
  <div class="field">
    <label class="label" for="textarea">{{ inputControl.controlLabel ?? "" }}</label>
    <div class="control">
      <textarea
        class="textarea"
        :rows="inputControl.rows"
        :class="{ 'is-danger': !isValid && isTouched }"
        id="textarea"
        v-model.trim="controlValue"
        @focus.once="testControlValidity(controlValue, inputControl.validators)"
        @blur.once="wasTouched()">
      </textarea>
    </div>
    <p class="help is-danger empty-p">{{ !isValid && isTouched ? errorMessage : "" }}</p>
  </div>
</template>

<script setup lang="ts">
import useControlTouched from "@/core/hooks/controlTouched";
import useControlValidator from "@/core/hooks/controlValidator";
import { PropType, toRefs, watch } from "vue";
import { TextareaControl } from "./TextareaControl";

const emit = defineEmits(["isValid"]);
const props = defineProps({
  inputControl: { type: Object as PropType<TextareaControl>, required: true },
});
const { inputControl } = toRefs(props);
const controlValue = defineModel<string>({ required: true });

const { isValid, errorMessage, testControlValidity } = useControlValidator(controlValue, inputControl.value);
const { isTouched, wasTouched } = useControlTouched();

watch(isValid, () => {
  emit("isValid", isValid.value);
});
</script>
