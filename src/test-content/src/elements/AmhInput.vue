<template>
  <div>
    <label>{{ label }}</label>
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="mr-2 border-2 border-grey-200 p-2"
      :class="altStyles"
      @input="emit('amhInput', model)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(["amhInput"]);
// eslint-disable-next-line no-unused-vars, no-undef
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

// TODO refactor to a map
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
