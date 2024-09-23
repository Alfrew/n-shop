<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>

    <base-page-title pageTitle="Login page"></base-page-title>
    <base-box>
      <form @submit.prevent="submitForm">
        <base-input-mail v-model="inputMail" :input-control="controlMail" @is-valid="updateValidity('email', $event)"></base-input-mail>
        <base-input-password v-model="inputPassword" :input-control="controlPassword" @is-valid="updateValidity('password', $event)"></base-input-password>
        <div class="buttons is-centered">
          <base-button color="is-primary">{{ submitButtonCaption }}</base-button>
          <!-- <base-button type="button" mode="is-light" @click="switchAuthMode">
            {{ switchButtonCaption }}
          </base-button> -->
        </div>
      </form>
    </base-box>
  </div>
</template>

<script setup lang="ts">
import { AuthForm } from "../models/AuthForm";
import { AuthFormData } from "../models/AuthFormData";
import { InputControl } from "@/core/components/inputs/InputControl";
import { Ref, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseInputMail from "@/core/components/inputs/BaseInputMail.vue";
import BaseInputPassword from "@/core/components/inputs/BaseInputPassword.vue";

const mode: Ref<"login" | "signup"> = ref("login");
const submitButtonCaption = computed(() => {
  if (mode.value === "login") {
    return "Login";
  } else {
    return "Signup";
  }
});
// const switchButtonCaption = computed(() => {
//   if (mode.value === "login") {
//     return "Signup instead";
//   } else {
//     return "Login instead";
//   }
// });
// function switchAuthMode() {
//   if (mode.value === "login") {
//     mode.value = "signup";
//   } else {
//     mode.value = "login";
//   }
// }

const formValidity: AuthForm = { email: false, password: false };
function updateValidity(controlName: keyof AuthForm, value: boolean) {
  formValidity[controlName] = value;
}
function isFormValid() {
  for (const prop in formValidity) {
    if (!formValidity[prop as keyof AuthForm]) {
      return false;
    }
  }
  return true;
}

const inputMail = ref<string>();
const controlMail = ref<InputControl>({ id: "mail", validators: { email: true, required: true } });
const inputPassword = ref<string>();
const controlPassword = ref<InputControl>({ id: "password", validators: { password: true, minLength: 8, required: true } });
function submitForm() {
  if (isFormValid()) {
    const formData: AuthFormData = {
      email: inputMail.value!,
      password: inputPassword.value!,
    };
    sendRequest(formData);
  }
}
const isLoading = ref(false);
const error = ref("");
const store = useStore();
async function sendRequest(formData: AuthFormData) {
  isLoading.value = true;
  try {
    if (mode.value === "login") {
      await store.dispatch("login", formData);
    } else {
      await store.dispatch("signup", formData);
    }
    changePageAfterAuthenticate();
  } catch (error: any) {
    error = error.message || "Failed to authenticate, try later.";
  }

  isLoading.value = false;
}

function handleError() {
  error.value = "";
}

const router = useRouter();
function changePageAfterAuthenticate() {
  router.replace({ name: "productList" });
}
</script>
