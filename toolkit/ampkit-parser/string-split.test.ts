import { describe, expect, test } from "@jest/globals";
import { StringSplitFactory } from "./string-split";
import { Tokens } from "./tokens";
import { tokenList } from "./token-list";
import { buiTokens } from "../options/index";

// import { myFile } from "../index";

const testStr = `import { LitElement, html, css } from 'lit'
import 'bui/elements/headers'
import 'bui/elements/hr'
import docs from 'bui/README.md'
import './setup'
import './changelog'

let docsStr = docs
let trimIndex = docsStr.search('## 🎉 Features')
docsStr = trimIndex > -1 ? docsStr.substr(trimIndex) : docsStr

// FIXME: needs improvement
var matches;
while (matches = /\(\.\/(.[^\/]+)\/README\.md\)/.exec(docsStr)) {
    docsStr = docsStr.replace(matches[0], \`(/\${matches[1]})\`)
}

`;

let str = testStr.replace(/\n/g, " ");

let tokens = new Tokens(tokenList);

const stringSplitInit = StringSplitFactory(tokens.tokensSet);

const stringSplit = stringSplitInit(str, buiTokens);

const result = stringSplit.split();

describe("Testing Base Parser", () => {
  const typeOfResult = typeof result;

  console.log(result);

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
