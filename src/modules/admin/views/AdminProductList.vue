<template>
  <div class="page-wrapper is-flex is-flex-direction-column">
    <base-dialog :show="isLoading" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <product-form-dialog :show="isDialogOpen" @close="closeDialog()" :product="selectedProduct"></product-form-dialog>
    <base-confirmation-dialog
      :show="isConfirmDialogOpen"
      :message="'Are you sure to delete the selected item?'"
      @close="deleteElement($event)"></base-confirmation-dialog>
    <base-page-title pageTitle="Admin products management"></base-page-title>
    <div class="buttons is-justify-content-end">
      <base-button color="is-primary" icon="fa-plus" @click="openDialog()">Add new product</base-button>
    </div>
    <base-table :data-source="productGames" :column-list="columnList" @icon-action="iconAction($event)"></base-table>
  </div>
</template>

<script setup lang="ts">
import { Column, IconActionEvent } from "@/core/components/elements/BaseTableUtils";
import { computed, onMounted, ref } from "vue";
import { GameProduct } from "@/modules/gameProducts/models/GameProduct";
import { useStore } from "vuex";
import BaseConfirmationDialog from "@/core/components/utilities/BaseConfirmationDialog.vue";
import BaseTable from "@/core/components/elements/BaseTable.vue";
import ProductFormDialog from "../components/ProductFormDialog.vue";

const columnList: Column[] = [
  { header: "Name", dataKey: "name", textAlign: "has-text-left" },
  { header: "Price", dataKey: "price", prefix: "$" },
  { header: "In Stock", dataKey: "inStock" },
  { header: "Release Date", dataKey: "releaseDate", type: "date" },
  { header: "Type", dataKey: "type" },
  {
    header: "Actions",
    dataKey: "actions",
    type: "action",
    icons: [
      { iconName: "fa-pencil", tooltip: "Edit" },
      { iconName: "fa-trash-can", tooltip: "Remove" },
    ],
  },
];

onMounted(() => {
  loadProducts(true);
});

const store = useStore();
const productGames = computed<GameProduct[]>(() => store.getters["gameProducts/gameProductList"]);
const error = ref("");
const isLoading = ref(false);
async function loadProducts(forceRefresh = false) {
  isLoading.value = true;
  try {
    await store.dispatch("gameProducts/loadGameProductList", {
      forceRefresh: forceRefresh,
    });
  } catch (err: any) {
    error.value = err.message || "Something went wrong, try again later";
  }
  isLoading.value = false;
}

function iconAction(iconActionEvent: IconActionEvent) {
  switch (iconActionEvent.iconName) {
    case "fa-pencil":
      edit(iconActionEvent.elementId);
      break;
    case "fa-trash-can":
      remove(iconActionEvent.elementId);
      break;
    default:
      console.log(iconActionEvent);
  }
}

const isDialogOpen = ref(false);
const selectedProduct = ref<GameProduct>();

function edit(id: string) {
  const product = productGames.value.find((el) => el.id === id);
  if (product) {
    selectedProduct.value = product;
    openDialog();
  }
}

function openDialog() {
  isDialogOpen.value = true;
}
function closeDialog() {
  isDialogOpen.value = false;
  selectedProduct.value = undefined;
  loadProducts(true);
}

const isConfirmDialogOpen = ref(false);
const deleteElementId = ref("");

function remove(id: string) {
  if (id) {
    deleteElementId.value = id;
    openConfirmDialog();
  }
}

function openConfirmDialog() {
  isConfirmDialogOpen.value = true;
}

function deleteElement(result: boolean) {
  if (result) {
    sendDeleteRequest(deleteElementId.value);
  }
  isConfirmDialogOpen.value = false;
  selectedProduct.value = undefined;
}

async function sendDeleteRequest(productId: string) {
  isLoading.value = true;
  try {
    await store.dispatch("gameProducts/deleteGameProduct", productId);
  } catch (error: any) {
    error = error.message || "Failed to delete, try later.";
  }
  isLoading.value = false;
  loadProducts(true);
}
</script>
