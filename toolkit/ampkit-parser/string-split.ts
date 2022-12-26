export const StringSplitFactory =
  (tokenSet: Set<string>, tokenActions?) => (inputString: string) => {
    return new StringSplit(tokenSet, inputString, tokenActions);
  };

class StringSplit {
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
    // TODO: could be just a string. I think I was imaginging multipes, but consider just a string
    let matchedTokensStack = [];
    let tokens = [];

    const walk = () => {
      if (counter >= this.inputString.length) {
        return;
      }

      char = this.inputString[counter];
      word = word + char;

      // if (word === ws) {
      //   word = "";
      //   counter = counter + 1;
      //   return walk();
      // }

      // if (word[word.length - 1] === ws) {
      //   let trimmedWord = word.trimEnd();
      //   let poppedToken = matchedTokensStack.pop();

      //   if (poppedToken === trimmedWord) {
      //     // preform token action
      //     staticTokens.push(trimmedWord);
      //     // this.tokenActions();
      //   }
      //   tokens.push(trimmedWord);
      //   word = "";
      //   counter = counter + 1;
      //   return walk();
      // }

      // TODO: recycle this class
      // instead maybe use this class to analyze each char in each word
      // ie --> customElements.define('b-file-manager',
      // or --> ['asdf','']
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
