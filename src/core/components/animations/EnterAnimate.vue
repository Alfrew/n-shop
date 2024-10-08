<template>
  <div :class="fullHeight" ref="target">
    <transition :name="animationType">
      <div class="is-full-height" :class="animationType" :data-isVisible="animate">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from "vue";
import { enterAnimationClasses } from "./EnterAnimateUtils";

const props = defineProps({
  animationType: {
    type: String,
    required: false,
    default: "fade",
    validator(value: string) {
      return enterAnimationClasses.includes(value);
    },
  },
  hasFullHeight: {
    type: Boolean,
    default: false,
  },
});

const { animationType, hasFullHeight } = toRefs(props);

const target = ref<Element>();
const animate = ref<boolean>(false);

const observer = new IntersectionObserver(([entry]) => {
  animate.value = entry.isIntersecting;
});

const fullHeight = computed(() => {
  return hasFullHeight.value ? "is-full-height" : "";
});

onMounted(() => {
  observer.observe(target.value as Element);
});
</script>

<style lang="scss" scoped>
/* Fade animation */
.fade {
  opacity: 0;
  transition: opacity 300ms ease;

  &[data-isVisible="true"] {
    opacity: 1;
  }
}

/* Zoom animation */
.zoom {
  transition: transform 300ms ease;
  transform: scale(0.9);
  &[data-isVisible="true"] {
    transform: scale(1);
  }
}

/* Special-fade animation */
.special-fade {
  opacity: 0;
  transform: translate(-20px, 10px) scale(0.9) rotateX(50deg);
  transition: opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);

  &[data-isVisible="true"] {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotateX(0);
  }
}
</style>
