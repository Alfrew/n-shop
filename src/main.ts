import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseButton from "./core/components/buttons/BaseButton.vue";
import BaseSpinner from "./core/components/utilities/BaseSpinner.vue";
import BaseBox from "./core/components/containers/BaseBox.vue";

require("./scss/main.scss");

const BaseDialog = defineAsyncComponent(() => import("./core/components/containers/BaseDialog.vue"));

const app = createApp(App);

app.use(store);
app.use(router);

app.component("base-button", BaseButton);
app.component("base-box", BaseBox);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);

app.mount("#app");
