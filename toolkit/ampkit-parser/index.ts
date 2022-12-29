import {
  groupMatchRulesMap,
  partMatchRulesMap,
} from "./individual-match-rules";

type Groups = {
  name: string;
  parts: string[];
  terminate: false;
  failed: boolean;
};

// Colors because it is easy to understand to me what they dop. red stop, green go etc. However I could see how this could be confusing for others. So not sure yet...
export type MatchState = "red" | "green" | "blue" | "yellow" | "green-yellow";

// keep track of what is matched
export type MatchObj = {
  name: "";
  parts: [];
};

export type Matched = MatchObj[];

export const ParseByGroupAndParts = function (
  words,
  groupMatchRulesMap,
  partMatchRulesMap,
  initGroupName
) {
  let groupCurrent: MatchObj = {
    name: "",
    parts: [],
  };
  // if there is a partial match
  let groupQueued: MatchObj = {
    name: "",
    parts: [],
  };

  // track and handle tracking actions
  // Keeping this together makes it easier for me to track...
  const stateTracker = {
    lastMatched: {
      type: "",
      name: "",
      state: "",
    },
    handleBlue: () => {
      // group current is marcher or whatever
    },
    currentState: "",
    set state(color) {
      stateTracker.currentState = color;
      switch (color) {
        case "blue":
          stateTracker.handleBlue();
          break;

        default:
          break;
      }
    },
  };

  const methods = {
    words: words,
    go: (counter) => {
      if (counter === 0) {
        stateTracker.lastMatched.type = "group";
        stateTracker.lastMatched.name = initGroupName;
        methods.getMatchSequence();
      }
    },
    getMatchSequence: () => {
      if (stateTracker.lastMatched.type === "group") {
        return groupMatchRulesMap.get(stateTracker.lastMatched.name)
          .matchSequence;
      } else if (stateTracker.lastMatched.type === "part") {
      }
      // stateTracker[stateTrigger];
    },
    match_IterateMatchSequence: (orderCounter, matchSequence) => {
      let wordCounter = 0;
      const matcher = matchSequence[orderCounter][wordCounter].matcher;
    },
  };

  return methods;
};
