<template>
  <transition-group v-if="isForList" name="slide" mode="out-in">
    <slot></slot>
  </transition-group>
  <transition v-else name="slide" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({ isForList: { type: Boolean, default: false, required: false } });
</script>

<style scoped lang="scss">
.slide-enter {
  opacity: 0;
}

.slide-move {
  transition: transform 1s;
}

.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  position: absolute;
  width: 100%;
  animation: slide-out 0.5s ease-out forwards;
  transition: opacity 0.5s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(350px);
  }
}
</style>
