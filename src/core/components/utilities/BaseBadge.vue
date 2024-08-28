<template>
  <div class="badge-wrapper" :title="String(badgeValue)">
    <span v-if="badgeValue" class="badge" :class="colorClasses">{{ badgeValue }}</span>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref, toRefs } from "vue";
import { badgeColorTypes } from "./BaseBadgeUtils";

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "danger",
    validator(value: string) {
      return badgeColorTypes.includes(value);
    },
  },
  badgeValue: {
    type: Number,
    required: false,
    default: 0,
  },
});

const colorClasses = computed(() => {
  return colorClassesSwitch(color);
});

function colorClassesSwitch(color: Ref<string>) {
  switch (color.value) {
    case "danger":
      return "has-background-danger has-text-light";
    case "white":
      return "has-background-white has-text-dark";
    case "black":
      return "has-background-black has-text-light";
    case "primary":
      return "has-background-primary has-text-light";
    case "info":
      return "has-background-info has-text-light";
    case "success":
      return "has-background-success has-text-light";
    case "warning":
      return "has-background-warning has-text-dark";
    default:
      return "";
  }
}

const { badgeValue, color } = toRefs(props);
</script>

<style lang="scss" scoped>
.badge-wrapper {
  position: relative;

  .badge {
    position: absolute;
    right: -30%;
    top: -30%;
    display: inline-block;
    border-radius: 1000px;
    max-width: 24px;
    min-height: 16px;
    min-width: 16px;
    padding: 0 4px;
    overflow: hidden;
    align-content: center;
    font-size: 0.7rem;
    font-weight: bold;
    text-align: center;
    text-overflow: ellipsis;
  }
}
</style>
