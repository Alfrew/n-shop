<template>
  <div class="field">
    <label class="label" for="sort">Sort by:</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select id="sort" v-model="selected">
          <option v-for="option in sortList" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs, watch } from "vue";
import { SelectOptionItem } from "../inputs/SelectControl";
const emit = defineEmits(["sortAction"]);
const props = defineProps({
  sortList: {
    type: Object as PropType<SelectOptionItem[]>,
    required: true,
  },
});
const { sortList } = toRefs(props);

const selected = ref(sortList.value[0].value);
watch(selected, () => {
  emit("sortAction", selected.value);
});
</script>
