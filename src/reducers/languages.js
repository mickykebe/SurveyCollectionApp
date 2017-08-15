const languages = (state = {}, action) => {
  return state;
}

export default languages;

export const getAllLanguages = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getLanguage = (state, id) => 
  state.byId[id];

export const getLanguagesFromCodes = (state, langCodes) =>
  getAllLanguages(state).filter(lang => langCodes.indexOf(lang.code) > -1);