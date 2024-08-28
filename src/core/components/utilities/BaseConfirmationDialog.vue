<template>
  <Teleport to="body">
    <div class="modal is-active">
      <div v-if="show" @click="dismiss()" class="modal-background"></div>
      <Transition name="dialog">
        <div v-if="show" class="modal-card">
          <header class="modal-card-head">
            <slot name="header">
              <p class="modal-card-title">Confirm action</p>
            </slot>
          </header>

          <section class="modal-card-body">
            <p>{{ message }}</p>
          </section>

          <footer class="modal-card-foot is-justify-content-end">
            <div class="buttons">
              <slot name="actions">
                <base-button color="is-danger" icon="fa-xmark" @click="dismiss()">Cancel</base-button>
                <base-button color="is-success" icon="fa-check" @click="confirm()">Confirm</base-button>
              </slot>
            </div>
          </footer>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const { fixed, show, message } = toRefs(props);
const emit = defineEmits(["close"]);
function dismiss() {
  if (fixed.value) {
    return;
  }
  emit("close", false);
}
function confirm() {
  if (fixed.value) {
    return;
  }
  emit("close", true);
}
</script>

<style lang="scss" scoped>
.modal {
  pointer-events: none;
  .modal-card,
  .modal-background {
    pointer-events: all;
  }
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.75);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
