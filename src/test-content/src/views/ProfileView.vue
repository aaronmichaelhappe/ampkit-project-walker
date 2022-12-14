<template>
  <div class="profile-view" :class="containerMainLayout">
    <h1>This is an profile page.</h1>
    <form class="grid grid-cols-2 gap-x-2 gap-y-4">
      <div>
        <AmhInput
          :model="user.firstName"
          :label="'First Name'"
          :placeholder="'Enter your first name'"
          :styleOptions="['widthFull']"
          @amh-input="(e) => onInput(e, 'firstName')"
        ></AmhInput>
      </div>
      <div>
        <AmhInput
          :model="user.lastName"
          :label="'Last Name'"
          :placeholder="'Enter your last name'"
          :styleOptions="['widthFull']"
        ></AmhInput>
      </div>
      <div>
        <AmhInput
          :model="user.email"
          :label="'Email'"
          :placeholder="'Enter your email'"
          :styleOptions="['widthFull']"
        ></AmhInput>
      </div>
      <div class="col-span-2">
        <AmhTextarea
          :model="user.bio"
          :label="'Bio'"
          :placeholder="'Tell us a little about yourself.'"
          :styleOptions="['widthFull']"
        ></AmhTextarea>
      </div>
      <div class="col-span-2">
        <AmhRadios
          :model="user.gender"
          :name="'gender'"
          :values="[{ value: 'he' }, { value: 'she' }, { value: 'they' }]"
        ></AmhRadios>
      </div>

      <AmhButton @click="handleSubmit">Submit</AmhButton>
    </form>
  </div>
</template>

<script setup>
import AmhButton from "@/elements/AmhButton.vue";
import AmhInput from "@/elements/AmhInput.vue";
import AmhRadios from "@/elements/AmhRadios.vue";
import AmhTextarea from "@/elements/AmhTextarea.vue";
import { containerMainLayout } from "../../tailwind";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

// eslint-disable-next-line no-unused-vars
const store = useUserStore();

const { user } = storeToRefs(store);
function onInput(value, from) {
  const lookUp = {
    firstName: () => (user.firstName = value),
    lastName: () => (user.lastName = value),
  };

  lookUp.get(from)();
}

function handleSubmit() {}
</script>
