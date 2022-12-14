import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import flyerFakeData, { createFlyerFakeData } from "../fake-temp-db/flyers";

export const useFlyersStore = defineStore("flyers", () => {
  const flyers = reactive(flyerFakeData);
  const flyersLength = computed(() => flyers.length);

  const createFlyer = createFlyerFakeData;

  function fetchFlyers() {
    return flyers;
  }

  return {
    createFlyer,
    fetchFlyers,
    flyersLength,
  };
});
