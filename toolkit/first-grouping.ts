import {
  type TokenActions,
  type MatcherFunction,
  type TokenAction,
  type MatchedTokenData,
} from "./options/token-actions";

// TODO: Fix this so can init go with tokens in here before using them in the index.

export const go = (
  words: string[],
  tokenCodex: Set<string>,
  tokenActions: TokenActions
) => {
  interface TokenData extends MatchedTokenData {
    token: string;
    terminate: boolean;
    static?: boolean;
  }

  let result: TokenData = { token: "", terminate: false, static: null };
  let matchingFunction: MatcherFunction;
  let matchInitialized = false;

  let tokens = words.map((word) => {
    if (tokenCodex.has(word)) {
      result.static = true;
    } else {
      result.static = false;
    }
    if (matchInitialized === false) {
      matchingFunction = tokenActions(word);

      if (matchingFunction !== undefined) {
        result = matchingFunction?.doAction(word);
        matchInitialized = true;
        return result;
      }
    } else if (matchInitialized === true) {
      result = matchingFunction?.doAction(word);
      return result;
    }
  });
  return tokens;
};
