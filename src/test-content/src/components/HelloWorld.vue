<template>
  <div class="flex">yoo? {{ msg }}</div>
</template>

<script setup>
import { defineProps } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>
