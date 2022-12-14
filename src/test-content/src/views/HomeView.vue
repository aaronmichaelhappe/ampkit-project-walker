<template>
  <div class="home-view" :class="containerMainLayout">
    <div class="relative z-[-1]">
      <AmhHeroH1 class="pb-4"></AmhHeroH1>
      <div>
        <p class="mx-width-[26rem] text-md pb-4 text-center italic leading-7">
          Test example.
        </p>

        <p class="mx-width-[26rem] text-md pb-4 text-center italic leading-7">
          This project was made with Vue 3, Pinia, Tailwind and more.
        </p>
        <TinyNavPartial class="mt-2"></TinyNavPartial>
      </div>
    </div>
  </div>
</template>

<script setup>
import AmhHeroH1 from "@/elements/AmhHeroH1.vue";
import TinyNavPartial from "@/views/partials/TinyNavPartial.vue";
import { containerMainLayout } from "../../tailwind";
</script>
