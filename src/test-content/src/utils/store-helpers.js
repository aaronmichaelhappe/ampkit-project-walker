import * as fakeData from "../fake-temp-db/data.js";

export function myFetch(data) {
  //TODO: check this is the function type I want to use
  return fakeData[data];
}
