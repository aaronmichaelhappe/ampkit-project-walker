export type TokenActions = (
  initToken: string,
  matchUnknownToken?: any
) => MatcherFunction;

export type MatcherFunction = {
  doAction: TokenAction;
};

export type TokenAction = (token: string) => any;

export let ImportStatementActions = function ImportStatementActions() {
  let hasBeenMatched = 0;
  this.doAction = function (token) {
    let result: string;
    let results = {
      result,
      failed: false,
      terminate: false,
      line: "import-statement",
      section: "module",
    };
    const matchImportedItem = () => {
      if (token === "*") {
        results.result = "*";
      } else {
        //const result.token = matchUknownToken(token);
        results.terminate = true;
        results.failed = true;
      }
    };
    const matchPath = function () {
      // possible failure here.
      // result.failed = true;
    };
    // type MatcherFunction = typeof matchImportedItem | typeof matchPath;
    const matchMethods = {
      matchImportedItem: matchImportedItem,
      matchPath: matchPath,
    };

    let matchActions = ["import", "matchImportedItem", "from", "matchPath"];

    const terminators = new Set<string>();
    terminators.add(";");
    //
    // STEP: #1
    if (terminators.has(token)) {
      results.terminate = true;
    }

    // calls matchMethods() => matchImportedItem, matchPath... etc.
    const doMatch = () => {
      if (matchActions[hasBeenMatched] === token) {
        results.result = token;
      } else if (matchMethods[matchActions[hasBeenMatched]] !== undefined) {
        //const result.token = matchUknownToken(token);
        const matchMethod = matchMethods[matchActions[hasBeenMatched]];
        matchMethod();
        results.result = token;
      }
    };
    //
    // STEP: #2
    doMatch();
    hasBeenMatched = hasBeenMatched + 1;

    return results;
  };
};

export const tokenActions: TokenActions = (initToken, matchUnknownToken?) => {
  // TODO: Add type for this. I forget how to do this with a constructor.
  let ImportStatementActionsConstructor = ImportStatementActions;

  if (initToken === "import") {
    return new ImportStatementActionsConstructor();
  }
};

// make class

// call it and pass in token. if a match, return new object and keep using it?
