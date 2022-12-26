import {
  type TokenActions,
  type MatcherFunction,
  type TokenAction,
} from "./options/token-actions";

// TODO: Fix this: init go function with tokens in this file. Rather than initalizing tokens in index.

export const go = (
  words: string[],
  tokenCodex: Set<string>,
  tokenActions: TokenActions
) => {
  type Part = {
    lineName?: "";
    value: any[];
  };
  type Section = {
    module: any;
    css: any;
    html: any;
  };
  type MatcherFunctionOrNull = MatcherFunction | null;
  let result: any;
  let part: Part = { lineName: "", value: [] };
  let section: Section = { module: [], css: [], html: [] };
  let matchingFunction: MatcherFunctionOrNull;
  let matchInitialized = false;

  let tokens = words.map((word) => {
    if (matchInitialized === false) {
      matchingFunction = tokenActions(word);

      // lots of repeat, refactor if gets too much  more complicated.
      if (matchingFunction !== undefined || matchingFunction !== null) {
        result = matchingFunction?.doAction(word);
        matchInitialized = true;
        part.lineName = result?.line;
        part.value = [...part.value, result?.result];
        if (result?.terminate) {
          if (!result?.failed) {
            section[result?.section].push(part);
          }
          part = { lineName: "", value: [] };
          matchingFunction = null;
        }
        return result;
      }
    } else if (matchInitialized === true) {
      result = matchingFunction?.doAction(word);
      part.value = [...part.value, result?.result];
      if (result?.terminate) {
        if (!result?.failed) {
          section[result?.section].push(part);
        }
        part = { lineName: "", value: [] };
        matchingFunction = null;
      }
      return result;
    }
  });
  console.log(tokens, "<---TOKENS");
  return tokens;
};
