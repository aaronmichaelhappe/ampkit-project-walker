<template>
  <div class="modal-comp fixed top-0 right-0 bottom-0 left-0 bg-grey-500/50">
    <div
      class="relative top-[25%] left-[25%] w-1/2 border-4 border-grey-100 bg-white p-4 shadow"
    >
      <button
        v-if="props.showCloseX"
        @click="emit('closeModal')"
        class="absolute top-[-1rem] left-[-1.5rem] h-4 w-4 rounded-full font-bold"
      >
        <ion-icon
          name="close-circle"
          class="absolute top-0 text-4xl text-green-500"
        ></ion-icon>
      </button>
      <div>
        <slot></slot>
        <div class="flex space-x-2 pt-2">
          <AmhButton
            @click="
              () => {
                emit('okModal');
              }
            "
          >
            {{ props.okTextValue
            }}<ion-icon name="add-outline" class="ml-1 text-xl"></ion-icon>
          </AmhButton>
          <AmhButton
            @click="
              () => {
                emit('cancelModal');
              }
            "
          >
            {{ props.cancelTextValue }}
          </AmhButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AmhButton from "@/elements/AmhButton.vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  showCloseX: {
    type: Boolean,
    required: false,
    default: false,
  },
  okTextValue: {
    type: String,
    required: false,
    default: "OK",
  },
  cancelTextValue: {
    type: String,
    required: false,
    default: "Cancel",
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["okModal", "closeModal"]);
</script>
