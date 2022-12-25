export const tokenActions = (token, tokens, walkedString) => {
  const importActions = () => {

  }
  const buiCustomElementActions = () => {

  }
  let tracking = {
    beingTracked: buiCustomElementActions,
    trackedQue: {},
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