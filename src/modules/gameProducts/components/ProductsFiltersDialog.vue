<template>
  <base-dialog :show="show" title="Filters">
    <template #default>
      <form @submit.prevent>
        <base-input-checkbox-list v-model="inputTypes" :input-select-control="typesControl"></base-input-checkbox-list>
        <base-input-radio-list v-model="inputPriceRange" :input-select-control="priceRangeControl"></base-input-radio-list>
        <base-input-radio-list v-model="inputReleaseYear" :input-select-control="releaseYearControl"></base-input-radio-list>
      </form>
    </template>

    <template #actions>
      <base-button mode="is-light" icon="fa-xmark" @click="closeDialog()">Cancel</base-button>
      <base-button color="is-danger" icon="fa-trash" @click="resetFilters()">Clear All</base-button>
      <base-button color="is-primary" icon="fa-save" :is-disabled="!isFormValid" @click="applyFilters()">Apply Filters</base-button>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import BaseDialog from "@/core/components/containers/BaseDialog.vue";
import BaseInputRadioList from "@/core/components/inputs/BaseInputRadioList.vue";
import BaseInputCheckboxList from "@/core/components/inputs/BaseInputCheckboxList.vue";

import { GameProductFilters } from "../models/GameProductFilters";
import { GameProductFiltersForm } from "../models/GameProductFiltersForm";
import { GameProductType } from "@/modules/gameProducts/models/GameProduct";
import { PropType, computed, reactive, ref, toRefs, watch } from "vue";
import { SelectControl } from "@/core/components/inputs/SelectControl";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  filters: {
    type: Object as PropType<GameProductFilters>,
    required: true,
  },
});
const { show, filters } = toRefs(props);

watch(show, function () {
  if (!!filters?.value) {
    patchFormValue();
  }
});

function patchFormValue() {
  if (!!filters?.value) {
    if (filters.value.minPrice && filters.value.maxPrice) {
      inputPriceRange.value = `${filters.value.minPrice}=${filters.value.maxPrice}`;
    }
    if (filters.value.releasedAfter) {
      inputReleaseYear.value = `${filters.value.releasedAfter}=${filters.value.releasedBefore}`;
    }
    if (!!filters.value.types) {
      inputTypes.value = filters.value.types;
    }
  }
}

const formValidity = reactive<GameProductFiltersForm>({
  types: true,
  priceRange: true,
  releaseYear: true,
});
const isFormValid = computed(function () {
  for (const prop in formValidity) {
    if (!formValidity[prop as keyof GameProductFiltersForm]) {
      return false;
    }
  }
  return true;
});

const inputPriceRange = ref<string>();
const priceRangeControl: SelectControl = {
  controlLabel: "Price range:",
  id: "priceRange",
  validators: {},
  optionList: [
    { label: "$0 - $19.99", value: "0=19.99" },
    { label: "$20 - $39.99", value: "20=39.99" },
    { label: "$40 - $59.99", value: "40=59.99" },
    { label: "$60+", value: "60=null" },
  ],
};
const inputReleaseYear = ref<string>();
const releaseYearControl: SelectControl = {
  controlLabel: "Release year:",
  id: "releaseYear",
  validators: {},
  optionList: [
    { label: "2021", value: "2021-01-01=2021-12-31" },
    { label: "2022", value: "2022-01-01=2022-12-31" },
    { label: "2023", value: "2023-01-01=2023-12-31" },
    { label: "2024", value: "2024-01-01=2024-12-31" },
  ],
};
const inputTypes = ref<GameProductType[]>([]);
const typesControl: SelectControl = {
  controlLabel: "Product type:",
  id: "productTypes",
  validators: {},
  optionList: [
    { label: "Game", value: "GAME" },
    { label: "DLC", value: "DLC" },
    { label: "Bundle", value: "BUNDLE" },
  ],
};

const emit = defineEmits(["close"]);
function closeDialog(filters?: GameProductFilters) {
  emit("close", filters);
}

function applyFilters() {
  const filters: GameProductFilters = {
    types: inputTypes.value,
  };
  if (inputPriceRange.value) {
    filters.maxPrice = +inputPriceRange.value.split("=")[1];
    filters.minPrice = inputPriceRange.value.split("=")[0] != "null" ? +inputPriceRange.value.split("=")[0] : undefined;
  }
  if (inputReleaseYear.value) {
    filters.releasedAfter = inputReleaseYear.value.split("=")[0];
    filters.releasedBefore = inputReleaseYear.value.split("=")[1];
  }
  closeDialog(filters);
}

function resetFilters() {
  inputPriceRange.value = undefined;
  inputReleaseYear.value = undefined;
  inputTypes.value = [];

  const filters: GameProductFilters = {
    maxPrice: undefined,
    minPrice: undefined,
    releasedAfter: undefined,
    releasedBefore: undefined,
    types: [],
  };

  closeDialog(filters);
}
</script>
