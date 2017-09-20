export default store => next => action => {
  const { response, ...restAction } = action;
  if(response) {
    const { next: nextOffset, count, ...restResponse } = response;
    const newAction = { response: restResponse , ...restAction };
    if(Number.isInteger(nextOffset)) {
      newAction.next = nextOffset;
    }
    if(Number.isInteger(count)) {
      newAction.count = count;
    }
    return next(newAction);
  }
  return next(action);
}