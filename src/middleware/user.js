export default store => next => action => {
  const { auth, ..._action } = action;
  if(auth) {
    const { currentUser } = store.getState().common;
    return next({ ..._action, userId: currentUser && currentUser.id });
  }
  return next(action);
}