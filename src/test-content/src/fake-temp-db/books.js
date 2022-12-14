import { faker } from "@faker-js/faker";

const books = [];

export function createBookFakeData() {
  return {
    id: faker.datatype.number(),
    title: faker.music.songName(),
    subtilte: faker.music.songName(50),
    author_id: faker.number,
    published: faker.date.between(
      "2010-01-01T00:00:00.000Z",
      "2022-01-01T00:00:00.000Z"
    ),
  };
}

Array.from({ length: 10 }).forEach(() => {
  books.push(createBookFakeData());
});

export default books;
