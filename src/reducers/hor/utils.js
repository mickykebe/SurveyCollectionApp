export const keyWrapState = (types, actionKey) => (hor) => {
  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of length 3');
  }
  if(!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be three strings');
  }
  if(typeof actionKey !== 'function' && typeof actionKey !== 'string') {
    throw new Error('Expected actionKey must be a string or function');
  }
  const [ actionRequest, actionSuccess, actionFail] = types;
  const asyncReducer = hor(actionRequest, actionSuccess, actionFail);

  return (state = {}, action) => {
    switch(action.type) {
      case actionRequest:
      case actionSuccess:
      case actionFail:
        let key = actionKey;
        if(typeof key === 'function') {
          key = actionKey(action);
        }
        if(typeof key !== 'string') {
          throw new Error('Expected key to be string');
        }
        return {
          ...state,
          [key]: asyncReducer(state[key], action),
        }
      default:
        return state;
    }
  }
}