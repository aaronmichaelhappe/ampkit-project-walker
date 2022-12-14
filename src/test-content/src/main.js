import "./registerServiceWorker";
import "./styles/app.css";
import { getFirebase } from "./firebase";
import App from "./App.vue";
import router from "./router";
import { initBeforeEachRoute } from "./router/before-route";
import { createApp } from "vue";
import { createPinia } from "pinia";

// import { getAnalytics } from "firebase/analytics";

const pinia = createPinia();

const firebaseServices = getFirebase();
initBeforeEachRoute();

createApp(App)
  .use(firebaseServices.firebaseApp)
  .use(pinia)
  .use(router)
  .mount("#app");

// docs
// https://firebase.google.com/docs/reference/js/firestore_
