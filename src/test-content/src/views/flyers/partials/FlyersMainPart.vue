<template>
  <div class="flyer-main-part">
    <div :class="containerMainLayoutColBleed"><AmhHeroH1></AmhHeroH1></div>
  </div>
</template>

<script setup>
import AmhHeroH1 from "@/elements/AmhHeroH1.vue";
import { containerMainLayoutColBleed } from "../../../../tailwind";
</script>
