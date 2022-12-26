type MatcherFunction = {
  doAction: <T>(word: string) => { token: string; terminate: boolean };
};

type MatchedTokenData = {
  token: string;
  terminate: boolean;
};

export const go = (words, tokenCodex, tokenActions) => {
  return true;
  const staticTokens = [];
  let collectedResults = [];
  let result: MatchedTokenData;
  let matchingFunction: MatcherFunction;
  let matchInitialized = false;

  words.forEach((word) => {
    if (tokenCodex.tokensSet.has(word)) {
      staticTokens.push(word);
    }
    if (matchInitialized === false) {
      matchingFunction = tokenActions(word);

      if (matchingFunction !== undefined) {
        result = matchingFunction?.doAction(word);
        collectedResults.push(result?.token);
        matchInitialized = true;
      }
    } else if (matchInitialized === true) {
      result = matchingFunction?.doAction(word);
      collectedResults.push(result?.token);
    }
  });
};
