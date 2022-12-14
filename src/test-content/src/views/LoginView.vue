<template>
  <div class="login-view" :class="containerMainLayout">
    <h1 class="pt-8 pb-6 text-center text-2xl font-bold sm:text-4xl">LOGIN</h1>
    <div class="pb-4">
      <AmhButton
        @click="handleGoogleSignIn"
        :type="'outline'"
        class="mx-auto max-w-[20rem]"
        >Log in with Google</AmhButton
      >
    </div>

    <p class="pb-8 text-center text-sm italic">More sign in methods to come.</p>
    <TinyNavPartial></TinyNavPartial>
  </div>
</template>
<script setup>
import AmhButton from "@/elements/AmhButton.vue";
import TinyNavPartial from "@/views/partials/TinyNavPartial.vue";
import router from "../router";
import { containerMainLayout } from "../../tailwind";
import { notNullOrNotUndefined } from "@/utils";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  setDocs,
  where,
} from "firebase/firestore";

const auth = getAuth();
const firestore = getFirestore();
const provider = new GoogleAuthProvider();

async function checkUserExistsInDb(currentUser) {
  // check if user doc exists by doing a query...
  const usersColl = collection(firestore, "users");
  const messageQuery = query(usersColl, where("uid", "==", currentUser.uid));
  const querySnapshot = await getDocs(messageQuery);

  if (!notNullOrNotUndefined(querySnapshot)) {
    setDocs(usersColl, {
      uid: currentUser.uid,
      authDisplayName: currentUser.displayName,
    });
    return false;
  }
  return true;
}

function handleGoogleSignIn() {
  signInWithPopup(auth, provider)
    // eslint-disable-next-line no-unused-vars
    .then(async (result) => {
      // const credential = provider.credentialFromResult(result);
      // FYI -> returns a token. You can use it to access the Google API.
      await checkUserExistsInDb(result.user);

      router.push({
        name: "dashboard",
      });
    })
    .catch(() => {
      // TODO fix this
      // const errorCode = error.code;
      // console.log(errorCode);
      // const errorMessage = error.message;
      // const email = error.customData.email;
    });
}
</script>
