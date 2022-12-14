<template>
  <div>
    <div id="pre-header-hook"></div>
    <header class="bg-grey-700 py-2">
      <div class="container mx-auto">
        <HeaderLoggedInPartial
          v-if="isSignedIn"
          :isMenuOpen="isOpen"
          @custom-click="toggle"
        ></HeaderLoggedInPartial>
        <HeaderLoggedOutPartial
          v-else-if="!isSignedIn"
        ></HeaderLoggedOutPartial>
      </div>
      {{ isSignedIn }}
    </header>
    <router-view />
  </div>
</template>

<script setup>
import HeaderLoggedInPartial from "@/views/partials/HeaderLoggedInPartial.vue";
import HeaderLoggedOutPartial from "@/views/partials/HeaderLoggedOutPartial.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getCurrentUser } from "./firebase";

// const auth = getAuth();
const isSignedIn = ref(false);
const isOpen = ref(false);
const route = useRoute();
const routeName = ref(route);

function toggle() {
  isOpen.value = !isOpen.value;
}

watch(routeName.value, () => {
  isOpen.value = false;
  isSignedIn.value = callGetCurrentUser();
});

async function callGetCurrentUser() {
  const getCurrentUserFunc = await getCurrentUser();

  if (getCurrentUserFunc === false) return;

  const value = await getCurrentUserFunc();
  isSignedIn.value = !!value && true;
}

onMounted(() => {
  isSignedIn.value = callGetCurrentUser();
  isOpen.value = false;
});
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
