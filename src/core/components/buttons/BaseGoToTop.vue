<template>
  <Teleport to="body">
    <transition-fade>
      <button v-if="isButtonVisible" class="button py-3 is-rounded is-primary is-to-top" @click="goToTop()">
        <span class="icon">
          <i class="fa fa-arrow-up"></i>
        </span>
      </button>
    </transition-fade>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import TransitionFade from "../animations/TransitionFade.vue";

onMounted(() => {
  window.addEventListener("scroll", onScroll);
}),
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });

const isButtonVisible = ref(false);

function onScroll() {
  if (window.scrollY > 500) {
    isButtonVisible.value = true;
  } else {
    isButtonVisible.value = false;
  }
}
function goToTop() {
  document.getElementById("app")!.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped lang="scss">
.is-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
</style>
