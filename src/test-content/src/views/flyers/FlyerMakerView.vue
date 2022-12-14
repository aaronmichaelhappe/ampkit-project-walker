<template>
  <div class="flyer-maker-view container"><p>asdf</p></div>
  <span
    >Flyers <span>{{ flyersLength }}</span></span
  >
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useFlyersStore } from "@/stores/flyers";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: {
    type: String,
    // required: true,
  },
});

const route = useRoute();

onMounted(() => {
  route.params;
});

const store = useFlyersStore();
const { flyersLength } = storeToRefs(store);
</script>
