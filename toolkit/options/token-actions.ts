export type TokenActions = (
  initToken: string,
  matchUnknownToken?: any
) => MatcherFunction;

export type MatcherFunction = {
  doAction: TokenAction;
};

export type TokenAction = (token: string) => MatchedTokenData;

export type MatchedTokenData = {
  token: string;
  terminate: boolean;
};

export const tokenActions: TokenActions = (initToken, matchUnknownToken?) => {
  // TODO: Add tpye for this. I forget how to do this with a constructor.
  function ImportActionsConstructor() {
    let hasBeenMatched = 1;
    this.doAction = function (token) {
      let result: MatchedTokenData = { token: token, terminate: false };
      const matchImportedItem = () => {
        if (token === "*") {
          result.token = "*";
        } else {
          //const result.token = matchUknownToken(token);
          result.token = token;
        }
      };
      const matchPath = function () {};
      // type MatcherFunction = typeof matchImportedItem | typeof matchPath;
      const doMatch = () => {
        const matchActionsString =
          typeof matchActions[hasBeenMatched] === "string"
            ? matchActions[hasBeenMatched]
            : null;
        const matchActionsFunc =
          typeof matchActions[hasBeenMatched] !== "string"
            ? matchActions[hasBeenMatched]
            : null;
        if (matchActionsString) {
          if (matchActionsString === token) {
            result.token = token;
          } else {
            //const result.token = matchUknownToken(token);
            result.token = token;
          }
        } else {
          matchActions[hasBeenMatched];
          // TODO: bug here
          // matchActionsFunc[hasBeenMatched]();
        }
      };
      const terminators = new Set<string>();
      terminators.add(";");

      let matchActions = ["import", matchImportedItem, "from", matchPath];

      if (terminators.has(token)) {
        result = { token: token, terminate: true };
      }

      doMatch();

      hasBeenMatched = hasBeenMatched + 1;
      return result;
    };
  }

  if (initToken === "import") {
    return new ImportActionsConstructor();
  }
};

// make class

// call it and pass in token. if a match, return new object and keep using it?
