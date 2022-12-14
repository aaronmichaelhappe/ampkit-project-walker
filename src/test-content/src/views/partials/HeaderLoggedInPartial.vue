<template>
  <div>
    <transition name="fade2">
      <div v-show="isMenuOpen">
        <div
          class="bg-brown-900 absolute right-0 bottom-0 left-0 top-0 z-10 opacity-40"
          :class="[!isMenuOpen && 'static w-0']"
        ></div>
      </div>
    </transition>
    <transition name="slide">
      <MenuMainComponent
        v-show="isMenuOpen"
        @custom-click-child="emitEvent"
        class="main-menu-component z-20"
        :isMenuOpen="isMenuOpen"
      ></MenuMainComponent>
    </transition>

    <div
      class="container mx-auto grid grid-cols-3 items-center justify-items-center gap-8"
    >
      <div class="justify-self-start">
        <transition name="fade">
          <ion-icon
            v-show="!isMenuOpen"
            @click="emitEvent"
            data-testid="menu-icon"
            name="menu-outline"
            class="cursor-pointer justify-center text-4xl text-grey-500"
          ></ion-icon>
        </transition>
      </div>
      <div>
        <ion-icon name="book-outline" class="text-4xl"></ion-icon>
      </div>
      <div class="justify-self-end">
        <p
          @click="handleLogOut"
          class="sm:text-md text-grey-300 flex cursor-pointer items-center text-sm"
        >
          Log Out
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getAuth, signOut } from "firebase/auth";
import router from "../../router";
import MenuMainComponent from "@/components/MenuMainComponent.vue";

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["custom-click"]);

const auth = getAuth();

function emitEvent() {
  emit("custom-click");
}

function handleLogOut() {
  signOut(auth)
    .then(() => {
      router.push({
        name: "login",
      });
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
</script>
<style>
.main-menu-component {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
}

.slide-enter-to {
  position: absolute;
  right: 30%;
  width: 30%;
  opacity: 1;
}

.slide-enter-from {
  position: absolute;
  left: -20vw;
  right: 120vw;
  opacity: 0;
  width: 0;
}

.slide-leave-to {
  position: absolute;
  left: -20vw;
  right: 120vw;
  width: 0;
}

.slide-leave-from {
  position: absolute;
  width: 30%;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade2-enter-active,
.fade2-leave-active {
  transition: all 0.8s ease;
}

.fade2-enter-from,
.fade2-leave-to {
  opacity: 0;
}

@media (max-width: 800px) {
  .main-menu-component {
    width: 45%;
  }

  .slide-enter-to {
    right: 45%;
    width: 45%;
  }

  .slide-enter-from {
    position: absolute;
    left: -80vw;
    right: 180vw;
  }

  .slide-leave-to {
    position: absolute;
    left: -80vw;
    right: 180vw;
  }

  .slide-leave-from {
    right: 45%;
    width: 45%;
  }
}

@media (max-width: 500px) {
  .main-menu-component {
    width: 100%;
  }

  .slide-enter-to {
    right: 100%;
    width: 100%;
  }

  .slide-enter-from {
    position: absolute;
    left: -120vw;
    right: 220vw;
  }

  .slide-leave-to {
    position: absolute;
    left: -120vw;
    right: 220vw;
  }

  .slide-leave-from {
    right: 100%;
    width: 100%;
  }
}
</style>
