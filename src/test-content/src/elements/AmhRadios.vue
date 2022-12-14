<template>
  <label>{{ label }}</label>
  <div class="flex">
    <span
      v-for="(value, index) in values"
      :key="index"
      class="mr-2 inline-block"
    >
      <input
        type="radio"
        v-model="model"
        :value="value.value"
        :name="name"
        class="mr-1"
      />
      <label>{{ value.label ? value.label : value.value }}</label>
    </span>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  label: {
    type: String,
  },
  model: {
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
});

const model = ref(props.model);
</script>
