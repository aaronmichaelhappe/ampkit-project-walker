import { render } from "@testing-library/vue";

import BooksView from "@/views/books/BooksView.vue";
import { setActivePinia, createPinia } from "pinia";

describe("BooksView.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("should have 10 books", () => {
    const { getAllByTestId } = render(BooksView);

    const books = getAllByTestId("book");

    expect(books.length).toBe(10);
  });
});
