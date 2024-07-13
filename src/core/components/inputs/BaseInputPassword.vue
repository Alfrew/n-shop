<template>
  <div class="field">
    <label class="label" for="password">{{ inputLabel }}</label>
    <div class="control">
      <input class="input" :class="{ 'is-danger': !isValid && isTouched }" type="password" id="password" v-model.trim="inputControl" @blur.once="wasTouched()" />
    </div>
    <p class="help is-danger" v-if="!isValid && isTouched">
      The password must contains minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    </p>
  </div>
</template>

<script setup lang="ts">
import useControlTouched from '@/core/hooks/controlTouched';
import useControlValidator from '@/core/hooks/controlValidator';
import { toRefs, watch } from 'vue';

const emit = defineEmits(['isValid']);
const props = defineProps({ inputLabel: { type: String, default: 'Password' } });
const { inputLabel } = toRefs(props);
const inputControl = defineModel<string>({ required: true });

const passwordRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

const { isValid } = useControlValidator(inputControl, passwordRegExp);
const { isTouched, wasTouched } = useControlTouched();

watch(isValid, () => {
  emit('isValid', isValid.value);
});
</script>
