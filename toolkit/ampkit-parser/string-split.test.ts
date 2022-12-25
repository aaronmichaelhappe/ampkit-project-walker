import { describe, expect, test } from "@jest/globals";
import { stringSplitInit } from "./string-split";
import { buiTokens } from "../options/index";

// import { myFile } from "../index";

const testStr = ` 

import 'cat' from '../dog'
`;

let str = testStr.replace(/\n/g, " ");

const stringSplit = stringSplitInit(str, buiTokens);

const result = stringSplit.split();

describe("Testing Base Parser", () => {
  const typeOfResult = typeof result;

  test("Should return an object", () => {
    expect(typeOfResult).toBe("object");
  });
});

// while (counter < this.inputString.length) {
//   char = this.inputString[counter];

//   word = word + char;

//   if (word === singleWS) {
//     counter = counter + 1;
//     continue;
//   }

//   if (word === doubleWS) {
//     // reset word to single white space so it catches this condition again.
//     word = singleWS;
//     counter = counter + 1;
//     continue;
//   }

// if (word[word.length - 1] === singleWS) {
//   let slicedWord = word.slice(0, word.length - 1);
//   let poppedToken = this.matchedTokensStack.pop();
//   word = singleWS;

//   if (poppedToken === slicedWord) {
//     if (!this.eattenUniqueMap.has(poppedToken)) {
//       this.eattenUniqueMap.set(poppedToken, 0);
//     }
//     let eattenWordCount = this.eattenUniqueMap.get(word);
//     this.eattenUniqueMap.set(poppedToken, eattenWordCount + 1);

//     this.eatten.push(poppedToken);
//     counter = counter + 1;
//     continue;
//     // left off here, watch counter
//   }
// }

//   if (this.tokenCodexDefault.has(word)) {
//     this.matchedTokensStack.push(word);
//     counter = counter + 1;
//     continue;
//   }

//   counter = counter + 1;
// }
