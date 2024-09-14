<template>
  <base-dialog :show="show" title="Add product">
    <template #default>
      <form @submit.prevent>
        <base-input-text v-model="inputName" :input-control="nameControl" @is-valid="updateControlValidity('name', $event)"></base-input-text>
        <base-input-text v-model="inputImageUrl" :input-control="imageUrlControl" @is-valid="updateControlValidity('imageUrl', $event)"></base-input-text>
        <base-input-text v-model="inputCoverUrl" :input-control="coverUrlControl" @is-valid="updateControlValidity('coverUrl', $event)"></base-input-text>
        <div class="columns">
          <div class="column">
            <base-input-select v-model="inputType" :input-select-control="typeControl" @is-valid="updateControlValidity('type', $event)"></base-input-select>
          </div>
          <div class="column">
            <base-input-date v-model="inputDate" :input-control="dateControl" @is-valid="updateControlValidity('releaseDate', $event)"></base-input-date>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <base-input-number v-model="inputPrice" :input-control="priceControl" @is-valid="updateControlValidity('price', $event)"></base-input-number>
          </div>
          <div class="column">
            <base-input-number v-model="inputInStock" :input-control="stockControl" @is-valid="updateControlValidity('inStock', $event)"></base-input-number>
          </div>
        </div>
        <base-input-textarea
          v-model="inputDescription"
          :input-control="descriptionControl"
          @is-valid="updateControlValidity('description', $event)"></base-input-textarea>
      </form>
    </template>

    <template #actions>
      <base-button mode="is-light" icon="fa-xmark" :is-disabled="isLoading" @click="closeDialog()">Cancel</base-button>
      <base-button color="is-info" icon="fa-list" :is-disabled="isLoading" @click="precompileForm()">Autocompile</base-button>
      <base-button color="is-primary" icon="fa-save" :is-disabled="!isFormValid || isLoading" :is-loading="isLoading" @click="submitForm()">Save Product</base-button>
    </template>
  </base-dialog>
</template>

<!-- Rivedere come gestire i vari form control
Extra:
-Form should trigger isValid
-Name/id
-->

<script setup lang="ts">
import BaseDialog from "@/core/components/containers/BaseDialog.vue";
import BaseInputNumber from "@/core/components/inputs/BaseInputNumber.vue";
import BaseInputSelect from "@/core/components/inputs/BaseInputSelect.vue";
import BaseInputText from "@/core/components/inputs/BaseInputText.vue";
import BaseInputTextarea from "@/core/components/inputs/BaseInputTextarea.vue";
import BaseInputDate from "@/core/components/inputs/BaseInputDate.vue";

import { GameProduct, GameProductType } from "@/modules/gameProducts/models/GameProduct";
import { GameProductFormData } from "@/modules/gameProducts/models/GameProductFormData";
import { InputControl } from "@/core/components/inputs/InputControl";
import { ProductForm } from "../models/ProductForm";
import { PropType, computed, reactive, ref, toRefs, watch } from "vue";
import { SelectControl } from "@/core/components/inputs/SelectControl";
import { TextareaControl } from "@/core/components/inputs/TextareaControl";
import { useStore } from "vuex";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object as PropType<GameProduct>,
    required: false,
    default: undefined,
  },
});
const { show, product } = toRefs(props);

watch(show, function () {
  if (!!product?.value) {
    patchFormValue();
  }
});

function patchFormValue() {
  if (!!product?.value) {
    inputCoverUrl.value = product.value.coverUrl;
    inputDate.value = product.value.releaseDate;
    inputDescription.value = product.value.description;
    inputImageUrl.value = product.value.imageUrl;
    inputInStock.value = product.value.inStock ?? 0;
    inputName.value = product.value.name;
    inputPrice.value = product.value.price;
    inputType.value = product.value.type;

    updateFormValidity(true);
  }
}

const formValidity = reactive<ProductForm>({
  coverUrl: false,
  description: false,
  imageUrl: false,
  inStock: true,
  name: false,
  price: true,
  releaseDate: true,
  type: true,
});
function updateFormValidity(isValid: boolean) {
  for (const prop in formValidity) {
    formValidity[prop as keyof ProductForm] = isValid;
  }
  // formValidity.coverUrl = isValid;
  // formValidity.description = isValid;
  // formValidity.imageUrl = isValid;
  // formValidity.inStock = isValid;
  // formValidity.name = isValid;
  // formValidity.price = isValid;
  // formValidity.releaseDate = isValid;
  // formValidity.type = isValid;
}
function updateControlValidity(controlName: keyof ProductForm, value: boolean) {
  formValidity[controlName] = value;
}
const isFormValid = computed(function () {
  for (const prop in formValidity) {
    if (!formValidity[prop as keyof ProductForm]) {
      return false;
    }
  }
  return true;
});

const inputName = ref<string>();
const nameControl: InputControl = { controlLabel: "Product Name", id: "productName", validators: { required: true } };
const inputImageUrl = ref<string>();
const imageUrlControl: InputControl = { controlLabel: "Product Image Url", id: "imageUrl", validators: { required: true } };
const inputCoverUrl = ref<string>();
const coverUrlControl: InputControl = { controlLabel: "Product Cover Url", id: "coverUrl", validators: { required: true } };
const inputDescription = ref<string>();
const descriptionControl: TextareaControl = { controlLabel: "Product Description", id: "description", rows: 10, validators: { required: true, minLength: 150 } };
const inputPrice = ref<number>();
const priceControl: InputControl = { controlLabel: "Product Price", id: "price", validators: { required: true, minValue: 0 } };
const inputDate = ref<string>(new Date().toISOString().split("T")[0]);
const dateControl: InputControl = { controlLabel: "Product Release Date", id: "releaseDate", validators: { required: true, minValue: 0 } };
const inputType = ref<GameProductType>("GAME");
const typeControl: SelectControl = {
  controlLabel: "Product Type",
  id: "type",
  validators: { required: true },
  optionList: [
    { label: "Game", value: "GAME" },
    { label: "DLC", value: "DLC" },
    { label: "Bundle", value: "BUNDLE" },
  ],
};
const inputInStock = ref();
const stockControl: InputControl = { controlLabel: "Product Stock", id: "stock", validators: { required: true, minValue: 0, maxValue: 25 } };
function submitForm() {
  if (isFormValid.value) {
    const formData: GameProductFormData = {
      coverUrl: inputCoverUrl.value!,
      description: inputDescription.value!,
      imageUrl: inputImageUrl.value!,
      inStock: inputInStock.value!,
      name: inputName.value!,
      price: inputPrice.value!,
      releaseDate: inputDate.value,
      type: inputType.value,
    };
    sendRequest(formData);
  }
}
function resetForm() {
  inputName.value = undefined;
  inputImageUrl.value = undefined;
  inputCoverUrl.value = undefined;
  inputDescription.value = undefined;
  inputPrice.value = undefined;
  inputInStock.value = undefined;
  inputDate.value = new Date().toISOString().split("T")[0];
  inputType.value = "GAME";

  updateFormValidity(false);
}

const isLoading = ref(false);
const error = ref("");
const store = useStore();
async function sendRequest(formData: GameProductFormData) {
  isLoading.value = true;
  try {
    if (product?.value?.id) {
      formData.id = product.value.id;
      await store.dispatch("gameProducts/saveGameProduct", formData);
    } else {
      await store.dispatch("gameProducts/saveGameProduct", formData);
    }
    closeDialog();
  } catch (error: any) {
    error = error.message || "Failed to authenticate, try later.";
  }

  isLoading.value = false;
}

// function handleError() {
//   error.value = "";
// }

const emit = defineEmits(["close"]);
function closeDialog() {
  resetForm();
  emit("close");
}

function precompileForm() {
  inputName.value = "Everybody 1-2-Switch!™";
  inputImageUrl.value = "https://assets.nintendo.eu/image/private/f_auto,c_limit,w_1920,q_auto:low/t_product_tile_mobile/ypnxx7aimuc5zvex5e2c";
  inputCoverUrl.value =
    "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000068159/de4985f3b03b7b50565be4b906ded22186f8365cc8c25bcbe1ed76882df39a17";
  inputDescription.value = `Laugh it up at your next game night!
Whether you’re summoning aliens or snapping colorful photos with your phone’s camera, mix up your next get-together with the Everybody 1-2-Switch! game. Grab some Joy-Con™ controllers or a whole bunch of smart devices for team-based games that are easy to set up.`;
  inputPrice.value = 29.99;
  inputInStock.value = 10;
  inputDate.value = "2023-06-30";
  inputType.value = "GAME";

  updateFormValidity(true);
}
</script>
