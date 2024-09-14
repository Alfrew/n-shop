<template>
  <transition-group v-if="isForList" name="fade">
    <slot></slot>
  </transition-group>
  <transition v-else name="fade" mode="out-in">
    <slot></slot>
  </transition>
</template>

<!-- TODO:
-Implement fade group animations
-->

<script setup lang="ts">
const props = defineProps({ isForList: { type: Boolean, default: false, required: false } });
</script>

<style lang="scss">
.fade-move {
  transition: transform 1s;
}

.fade-enter-active {
  animation: fade-in 0.5s ease-out forwards;
}

.fade-leave-active {
  animation: fade-in 0.5s ease-out reverse;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
