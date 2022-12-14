<template>
  <div
    data-testid="menu-main-component"
    class="menu-main-comp bg-grey-50 shadow"
  >
    <button
      data-testid="menu-close-button"
      class="absolute top-2 right-9 h-4 w-4 rounded-full font-bold"
      @click="handleCloseMenu"
    >
      <transition name="fade">
        <ion-icon
          name="close"
          class="text-light-green-200 absolute top-0 text-4xl"
          v-show="isMenuOpen"
        ></ion-icon>
      </transition>
    </button>

    <nav
      class="flex h-full flex-col bg-green-800 pl-4 pt-4 font-bold leading-8 text-white"
    >
      <p class="bg-none pt-4 text-2xl leading-8">Main Menu</p>
      <router-link to="/books" class="cursor-pointer">Books</router-link>
      <router-link to="/flyers">Flyers</router-link>
      <router-link to="/books">Filler Text Link</router-link>
      <router-link to="/books">Filler</router-link>
      <router-link to="/books">Lorum Ipsum</router-link>
      <router-link to="/books">Inpsum Lorum</router-link>
      <router-link to="/books">Links can go</router-link>
      <router-link to="/books">Here</router-link>
    </nav>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const emit = defineEmits(["custom-click-child"]);
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
});

function handleCloseMenu() {
  emit("custom-click-child");
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
// later in some func
