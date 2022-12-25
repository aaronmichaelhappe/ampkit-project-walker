export class Tokens {
  tokensSet = new Set<string>();
  tokens = new Map<string, any>();
  initTokens: string[]
  constructor(initTokens) {

    this.initTokens = initTokens;
    this.createTokens();
  }
  createTokens(tokenList?) {
    // add all my tokens for this project here. 
    const tokens = tokenList ? tokenList : this.initTokens;
    tokens.forEach(token => this.tokens.set(token.name !== undefined ? token.name : token, token.properties !== undefined ? token.properties : {}));
    this.craeteTokenSets();
  }
  craeteTokenSets() {
    this.tokens.forEach((token, key) => this.tokensSet.add(key));
  }
  // add 3rd party tokens
  addTokens(tokens: [] | Map<string, any>) {
    if (Array.isArray(tokens)) {
      this.createTokens(tokens);
    } else {
      tokens.forEach((token, key) => this.tokens.set(key, token));
      this.craeteTokenSets();
    }

  }
}