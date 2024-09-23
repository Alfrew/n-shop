<template>
  <h1 class="title">{{ pageTitle }}</h1>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({ pageTitle: { type: String, required: true } });
const { pageTitle } = toRefs(props);
document.title = pageTitle.value;
</script>
