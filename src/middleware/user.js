export default store => next => action => {
  const { auth, ..._action } = action;
  if(auth) {
    const userId = store.getState().common.currentUser.id;
    return next({ ..._action, userId });
  }
  return next(action);
}