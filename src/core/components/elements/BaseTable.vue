<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th v-for="column in columnList" :key="column.dataKey">
          {{ column.header }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, idx) in dataSource" :key="idx">
        <td v-for="column in columnList" :key="column.dataKey" :class="column.textAlign ?? 'has-text-left'">
          <!-- LINK -->
          <router-link v-if="column.type == 'link'" :to="column.url">{{ item[column.dataKey] }}</router-link>
          <!-- CTA -->
          <span v-else-if="column.type == 'action'">
            <span v-for="(icon, idx) in column.icons" :key="idx" class="icon">
              <i class="fa" :class="icon.iconName" @click="emitIconAction(icon.iconName, item.id)" :title="icon.tooltip"></i>
            </span>
          </span>
          <!-- DEFAULT -->
          <span v-else>
            <span v-if="column.prefix">{{ column.prefix }}</span
            >{{ item[column.dataKey] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { PropType, toRefs } from "vue";
import { Column, IconActionEvent } from "./BaseTableUtils";

const emit = defineEmits(["iconAction"]);
const props = defineProps({ columnList: { type: Object as PropType<Column[]>, required: true }, dataSource: { type: Object as PropType<any[]>, required: true } });
const { columnList, dataSource } = toRefs(props);

function emitIconAction(iconName: string, itemId: string) {
  const iconEmitter: IconActionEvent = {
    iconName: iconName,
    elementId: itemId,
  };
  emit("iconAction", iconEmitter);
}
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
  transition: opacity 250ms;

  &:hover {
    opacity: 0.75;
  }
}
</style>
