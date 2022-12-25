import { Tokens } from './tokens'

const tokenList = ['import']
let tokens = new Tokens(tokenList);


const tokenActions = (token, tokens, walkedString) => {


  const importActions = () => {

  }
  const buiCustomElementActions = () => {

  }
  let tracking = {
    beingTracked: buiCustomElementActions,
    buiCustomElement: {
      tokens: [],
    }
  };

  if (tracking.beingTracked !== null) tracking.beingTracked();

  if (token === 'import') {
    importActions();
    return
  }
  if (token === 'buiCustomElement') {
    // c
    buiCustomElementActions();
    return;
  }
  if (token === 'class' && tracking.buiCustomElement.tokens.length === 0) {

  }
  // functions, different types of them
  // if, switch, while, dowhile
}

const StringSplitFactory = (tokenSet: Set<string>) => (inputString: string, tokenSetCustom?, tokenActions?) => {
  // i expect a reason to use this factory
  return new StringSplit(tokenSet, inputString, tokenSetCustom, tokenActions);
};
export const stringSplitInit = StringSplitFactory(tokens.tokensSet);

class StringSplit<T> {
  inputString;

  tokenSetDefault = new Set();
  tokenSetCustom;
  tokenActions: any;
  eattenUniqueMap = new Map();
  eatten = [];

  constructor(tokenSet: Set<string>, inputString: string, tokenActions?, tokenSetCustom?) {
    this.inputString = inputString;
    this.tokenActions = tokenActions;
    this.tokenSetCustom = tokenSetCustom;
    this.initTokenCodexDefault();
  }
  initTokenCodexDefault() {
    // this.tokenSetDefault.add(singleWS);
    // this.tokenSetDefault.add(doubleWS);
    // separate these
    this.tokenSetDefault.add('import');
  }
  split() {
    let counter = 0;
    let word = '';
    let char = '';
    let singleWS = ' ';
    let matchedTokensStack = [];
    let tokens = [];

    const walk = () => {

      if (counter >= this.inputString.length) {
        return;
      }

      char = this.inputString[counter];

      word = word + char;
      if (word === singleWS) {
        word = '';
        counter = counter + 1;
        return walk();
      }

      if (word[word.length - 1] === singleWS) {
        let trimmedWord = word.trimEnd();
        let poppedToken = matchedTokensStack.pop();

        if (poppedToken === trimmedWord) {
        }
        tokens.push(trimmedWord);
        word = '';
        // this.tokenActions(poppedToken, this.inputString.splice(0, counter))
        counter = counter + 1;
        return walk();
      }

      // don't reset word because next iteration is to determine if word matches token
      if (this.tokenSetDefault.has(word)) {
        matchedTokensStack.push(word);
        counter = counter + 1;
        return walk();
      }

      counter = counter + 1;
      return walk();
    }
    walk();
    return { word: word, tokens };
  }
}