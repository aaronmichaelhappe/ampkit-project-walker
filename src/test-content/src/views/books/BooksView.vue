<template>
  <div class="books-view container" :class="containerMainLayout">
    <p data-testid="book" v-for="book in books" :key="book.id">
      {{ book.title }}
    </p>
  </div>
</template>

<script setup>
import { containerMainLayout } from "../../../tailwind";
import { ref } from "vue";
import { useBooksStore } from "../../stores/books";

const store = useBooksStore();

const books = ref(store.fetchBooks());
</script>
