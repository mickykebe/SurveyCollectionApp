const surveys = (state = {}, action) => {
  return state;
}

export default surveys;

export const getAllSurveys = (state) =>
  state.allIds.map(id => state.byId[id]);