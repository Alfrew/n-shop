<template>
  <button v-if="!link" class="button" :class="[mode, color, { 'is-loading': isLoading }]">
    <span v-if="icon" class="icon">
      <i class="fas" :class="icon"></i>
    </span>
    <span><slot></slot></span>
  </button>
  <router-link v-else :to="to" class="button" :class="[mode, color]">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { bulmaColorClasses, bulmaModeClasses } from "./BaseButtonUtils";

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
  icon: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    required: false,
    default: "/",
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const { link, mode, to, color, isLoading, icon } = toRefs(props);
</script>
