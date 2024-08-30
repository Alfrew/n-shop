<template>
  <div class="notification" :class="colorClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { bulmaColorClasses } from "./BaseNotificationUtils";

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "",
    validator(value: string) {
      return bulmaColorClasses.includes(value);
    },
  },
  isLight: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const { color, isLight } = toRefs(props);

const colorClasses = computed(() => {
  return [color.value, isLight ? "is-light" : ""];
});
</script>
