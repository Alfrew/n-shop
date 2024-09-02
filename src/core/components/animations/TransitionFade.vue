<template>
  <transition-group v-if="isForList" name="fade" mode="out-in">
    <slot></slot>
  </transition-group>
  <transition v-else name="fade" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({ isForList: { type: Boolean, default: false, required: false } });
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
