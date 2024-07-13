<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <base-input-mail :model-value="inputMail" @is-valid="updateValidity('email', $event)"></base-input-mail>
        <base-input-password :model-value="inputPassword" @is-valid="updateValidity('password', $event)"></base-input-password>
        <div class="buttons is-centered">
          <base-button color="is-primary">{{ submitButtonCaption }}</base-button>
          <base-button type="button" mode="is-light" @click="switchAuthMode">
            {{ switchButtonCaption }}
          </base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import BaseInputMail from '@/core/components/inputs/BaseInputMail.vue';
import BaseInputPassword from '@/core/components/inputs/BaseInputPassword.vue';
import { Ref, computed, ref } from 'vue';
import { AuthFormData } from '../models/AuthFormData';
import { AuthForm } from '../models/AuthForm';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const inputMail = ref('');
const inputPassword = ref('');
const formValidity: AuthForm = { email: false, password: false };
const isLoading = ref(false);
const error = ref('');
const store = useStore();
const router = useRouter();
let mode: Ref<'login' | 'signup'> = ref('login');

const submitButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Login';
  } else {
    return 'Signup';
  }
});

const switchButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Signup instead';
  } else {
    return 'Login instead';
  }
});

function switchAuthMode() {
  if (mode.value === 'login') {
    mode.value = 'signup';
  } else {
    mode.value = 'login';
  }
}

function updateValidity(controlName: keyof AuthForm, value: boolean) {
  formValidity[controlName] = value;
}
function isFormValid() {
  return formValidity.email && formValidity.password;
}

function submitForm() {
  if (isFormValid()) {
    const formData: AuthFormData = {
      email: inputMail.value,
      password: inputPassword.value,
    };
    sendRequest(formData);
  }
}
async function sendRequest(formData: AuthFormData) {
  isLoading.value = true;
  try {
    if (mode.value === 'login') {
      await store.dispatch('login', formData);
    } else {
      await store.dispatch('signup', formData);
    }
    changePageAfterAuthenticate();
  } catch (error: any) {
    error = error.message || 'Failed to authenticate, try later.';
  }

  isLoading.value = false;
}

function changePageAfterAuthenticate() {
  router.replace({ name: 'store' });
}

function handleError() {
  error.value = '';
}
</script>
