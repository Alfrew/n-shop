<template>
  <span class="tag" :class="specialClasses">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { bulmaTagColorClasses, bulmaTagSizeClasses } from "./BaseTagUtils";

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "",
    validator(value: string) {
      return bulmaTagColorClasses.includes(value);
    },
  },
  size: {
    type: String,
    required: false,
    default: "",
    validator(value: string) {
      return bulmaTagSizeClasses.includes(value);
    },
  },
  isLight: {
    type: Boolean,
    required: false,
    default: false,
  },
  isRounded: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const { color, size, isLight, isRounded } = toRefs(props);

const specialClasses = computed(() => {
  return [color.value, size.value, isLight.value ? "is-light" : "", isRounded.value ? "is-rounded" : ""];
});
</script>
