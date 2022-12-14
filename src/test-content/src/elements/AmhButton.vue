<template>
  <!-- // TODO: think about els being web components -->
  <button
    class="flex items-center justify-center self-center rounded-full px-4 py-2 font-bold text-white"
    :class="altStyles"
  >
    <slot></slot>
  </button>
</template>
<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
});

let altStyles = ref("bg-green-400");

const styleLookup = {
  outline: "border-2 ",
};

if (props.type !== "") {
  altStyles.value = styleLookup[props.type];
}
</script>
