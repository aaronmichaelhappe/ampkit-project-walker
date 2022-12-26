export const MatchTokenFactory =
  (tokenSet: Set<string>, tokenActions?) => (inputString: string) => {
    return new MatchToken(tokenSet, inputString, tokenActions);
  };

class MatchToken {
  inputString;
  tokenSet;

  constructor(tokenSet: Set<string>, inputString: string, tokenActions?) {
    this.inputString = inputString;
    this.tokenSet = tokenSet;
  }
  match() {
    let counter = 0;
    let word = "";
    let char = "";
    let token = "";

    const walk = () => {
      if (counter >= this.inputString.length) {
        return;
      }

      char = this.inputString[counter];
      word = word + char;

      // word is still buildling and no longer matches
      if (token && word.length > token.length && !this.tokenSet.has(word)) {
        word = "";
        counter = counter + 1;
        return walk();
      }

      if (this.tokenSet.has(word)) {
        token = word;
        counter = counter + 1;
        return walk();
      }

      counter = counter + 1;
      return walk();
    };
    walk();
    return token;
  }
}
