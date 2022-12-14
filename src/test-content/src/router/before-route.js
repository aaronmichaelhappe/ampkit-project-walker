import router from "./index.js";
import { getCurrentUser } from "@/firebase.js";

export function initBeforeEachRoute() {
  // router needs to use Auth. so thus outside of router.js
  router.beforeEach(async (to) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !(await getCurrentUser())) {
      if (to.name !== "login") return { path: "/login" };
    }
  });
}
