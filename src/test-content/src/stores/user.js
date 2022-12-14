import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    firstName: "",
    lastName: "",
    displayName: "",
    bio: "",
    email: "",
    gender: "",
  });

  return {
    user,
  };
});
