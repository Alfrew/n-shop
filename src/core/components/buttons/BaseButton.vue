<template>
  <button v-if="!link" class="button" :class="[mode, color]">
    <slot></slot>
  </button>
  <router-link v-else :to="to" class="button" :class="[mode, color]">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { bulmaColorClasses, bulmaModeClasses } from './BaseButtonUtils';

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
    validator(value: string) {
      return bulmaModeClasses.includes(value);
    },
  },
  color: {
    type: String,
    required: false,
    default: null,
    validator(value: string) {
      return bulmaColorClasses.includes(value);
    },
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    required: false,
    default: '/',
  },
});
const { link, mode, to, color } = toRefs(props);
</script>
