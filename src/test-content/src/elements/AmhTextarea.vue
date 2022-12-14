<template>
  <label>{{ label }}</label>
  <textarea
    v-model="model"
    type="text"
    :placeholder="placeholder"
    class="mr-2 border-2 border-grey-200 p-2"
    :class="altStyles"
  >
  </textarea>
</template>
<script setup>
import { defineProps, ref } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  model: {
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  styleOptions: {
    type: Array,
    required: false,
  },
});

const model = ref(props.model);
let altStyles = ref("");

const styleLookup = {
  widthFull: "w-full",
  widthOneHalf: "w-1/2",
};

if (props.styleOptions !== "") {
  altStyles.value = props.styleOptions.map((o) =>
    styleLookup[o] !== undefined ? styleLookup[o] : ""
  );
}
</script>
