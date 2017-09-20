const pagination = (actionSuccess) =>
  (state = { count: 0, next: 0 }, action) => {
    switch(action.type) {
      case actionSuccess: 
        return {
          count: action.count,
          next: action.next,
        };
      default:
        return state;
    }
  }

export default pagination;