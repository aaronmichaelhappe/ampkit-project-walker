export const tokenActions = (token, collectedTokens?, walkedString?) => {
  const importActions = () => {
    const terminators = new Set();
    // const concurrent = new Set();
    terminators.add("import");
    // terminators.add(';')
    //'import', 'customElement.define', 'class', 'const'
    if (terminators.has(token)) {
      // TODO: left off here.
      return true;
    }
    // add collected tokens back to import;

    // else if () {

    // }
  };
  const buiCustomElementActions = () => {};

  let trackingCurrently = null;
  let trackingQueue = ["func2", "func3", "func4"];
  let trackingQueReplacement = [];

  if (trackingCurrently !== null) {
    trackingCurrently();
    if (trackingQueue.length) {
      // tracking.current();
      const deQueue = () => {
        trackingQueue = trackingQueue.reverse();
        const next = trackingQueue.pop();
        // next.func();
        trackingQueReplacement.push(next);
        if (trackingQueue.length) {
          deQueue();
        } else {
          trackingQueue = trackingQueReplacement;
          trackingQueReplacement = [];
          return { trackingQueue, trackingQueReplacement };
        }
      };
      deQueue();
    }
  } else {
    if (token === "import") {
      return importActions();
    }
  }
};
