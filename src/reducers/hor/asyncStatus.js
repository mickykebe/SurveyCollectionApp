const asyncStatus = (actionRequest, actionSuccess, actionFail) => 
  (state = {
    inProgress: false,
    errors: null,
  }, action) => {
    switch(action.type) {
      case actionRequest:
        return {
          inProgress: true,
          errors: null
        };
      case actionSuccess:
        return {
          inProgress: false,
          errors: null,
        };
      case actionFail:
        return {
          inProgress: false,
          errors: action.errors
        }
      default:
        return state;
    }
  }

export default asyncStatus;