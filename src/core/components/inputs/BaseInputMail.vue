<template>
  <div class="field">
    <label class="label" for="email">{{ inputLabel }}</label>
    <div class="control">
      <input class="input" :class="{ 'is-danger': !isValid && isTouched }" type="email" id="email" v-model.trim="inputControl" @blur.once="wasTouched()" />
    </div>
    <p class="help is-danger" v-if="!isValid && isTouched">Please input a valid email (example: johndoe@example.com)</p>
  </div>
</template>

<script setup lang="ts">
import useControlTouched from '@/core/hooks/controlTouched';
import useControlValidator from '@/core/hooks/controlValidator';
import { toRefs, watch } from 'vue';

const emit = defineEmits(['isValid']);
const props = defineProps({ inputLabel: { type: String, default: 'E-Mail' } });
const { inputLabel } = toRefs(props);
const inputControl = defineModel<string>({ required: true });

const mailRegExp = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const { isValid } = useControlValidator(inputControl, mailRegExp);
const { isTouched, wasTouched } = useControlTouched();

watch(isValid, () => {
  emit('isValid', isValid.value);
});
</script>
