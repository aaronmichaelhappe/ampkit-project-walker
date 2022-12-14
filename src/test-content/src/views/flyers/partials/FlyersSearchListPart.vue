<template>
  <div class="bg-brown-25 h-[14rem]">
    <div class="flyers-search-list-part" :class="containerMainLayoutColBleed">
      <h3>Recent Flyers</h3>
      <ul class="no-wrap flex flex-col gap-y-4 pt-2">
        <li v-for="flyer in flyers" :key="flyer.id" class="p-2 text-xs">
          {{ flyer.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { containerMainLayoutColBleed } from "../../../../tailwind";

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  flyers: {
    type: Array,
    required: true,
  },
});
</script>
