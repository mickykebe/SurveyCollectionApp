export const createKeyWrappedReducer = (actionKey) => (reducer) => {
  if(typeof actionKey !== 'function' && typeof actionKey !== 'string') {
    throw new Error('Expected actionKey must be a string or function');
  }

  return (state = {}, action) => {
    let key = actionKey;
    if(typeof key === 'function') {
      key = actionKey(action);
    }
    if(key === undefined && state === undefined) {
      return state;
    }
    return {
      ...state,
      [key]: reducer(state[key], action),
    }
  }
}