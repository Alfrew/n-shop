<template>
  <div class="notification" :class="colorClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { bulmaNotificationColorClasses } from "./BaseNotificationUtils";

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "",
    validator(value: string) {
      return bulmaNotificationColorClasses.includes(value);
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
  return [color.value, isLight.value ? "is-light" : ""];
});
</script>
