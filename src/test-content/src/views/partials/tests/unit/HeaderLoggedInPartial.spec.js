/* eslint-disable no-undef */
import HeaderLoggedInPartial from "@/views/partials/HeaderLoggedInPartial.vue";
// eslint-disable-next-line no-unused-vars
import firebaseConfig from "../../../../firebase-config";
import { initializeApp } from "firebase/app";
import { render, screen, fireEvent } from "@testing-library/vue";
import { setActivePinia, createPinia } from "pinia";

describe("HeaderLoggedInPartial.vue", () => {
  beforeAll(() => {
    initializeApp(firebaseConfig);
    setActivePinia(createPinia());
  });

  it("Should have a visible hamburger menu after this. First hamburger menu button clicked open, then clicked closed again.", async () => {
    render(HeaderLoggedInPartial);
    const menuIconEl = await screen.findByTestId("menu-icon");

    await fireEvent.click(menuIconEl);

    const menuCloseButtonEl = screen.getByTestId("menu-close-button");

    await fireEvent.click(menuCloseButtonEl);

    expect(menuIconEl).not.toBeNull();
  });
});
