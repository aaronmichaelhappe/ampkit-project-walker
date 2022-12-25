import { Tokens } from "./tokens";
import { tokenList } from "./token-list";
import { tokenActions } from "./token-actions";

let tokens = new Tokens(tokenList);

const StringSplitFactory =
  (tokenSet: Set<string>) => (inputString: string, tokenActions?) => {
    return new StringSplit(tokenSet, inputString, tokenActions);
  };
export const stringSplitInit = StringSplitFactory(tokens.tokensSet);

class StringSplit<T> {
  inputString;
  tokenSet;
  tokenActions: any;

  constructor(tokenSet: Set<string>, inputString: string, tokenActions?) {
    this.inputString = inputString;
    this.tokenActions = tokenActions;
    this.tokenSet = tokenSet;
  }
  split() {
    let counter = 0;
    let word = "";
    let char = "";
    let singleWS = " ";
    let matchedTokensStack = [];
    let tokens = [];

    const walk = () => {
      if (counter >= this.inputString.length) {
        return;
      }

      char = this.inputString[counter];
      word = word + char;

      if (word === singleWS) {
        word = "";
        counter = counter + 1;
        return walk();
      }

      if (word[word.length - 1] === singleWS) {
        let trimmedWord = word.trimEnd();
        let poppedToken = matchedTokensStack.pop();

        if (poppedToken === trimmedWord) {
        }
        tokens.push(trimmedWord);
        word = "";
        // this.tokenActions(poppedToken, this.inputString.splice(0, counter))
        counter = counter + 1;
        return walk();
      }

      // don't reset word because next iteration is to determine if word matches token
      if (this.tokenSet.has(word)) {
        matchedTokensStack.push(word);
        counter = counter + 1;
        return walk();
      }

      counter = counter + 1;
      return walk();
    };
    walk();
    return { word: word, tokens };
  }
}
