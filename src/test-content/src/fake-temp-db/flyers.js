import { faker } from "@faker-js/faker";

const flyers = [];

export function createFlyerFakeData() {
  return {
    id: faker.datatype.number(),
    title: faker.music.songName(),
    created: faker.date.between(
      "2010-01-01T00:00:00.000Z",
      "2022-01-01T00:00:00.000Z"
    ),
  };
}

Array.from({ length: 10 }).forEach(() => {
  flyers.push(createFlyerFakeData());
});

export default flyers;
