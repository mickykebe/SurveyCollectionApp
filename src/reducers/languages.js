const defaultState = {
  byCode:{
    "en": {
      code: "en",
      name: "English"
    },
    "am": {
      code: "am",
      name: "Amharic"
    },
    "or": {
      code: "Or",
      name: "Oromiffa"
    }
  },
  allCodes: ["en", "am", "or"],
};

const languages = (state = defaultState, action) => {
  return state;
}

export default languages;

export const getAllLanguages = (state) =>
  state.allCodes.map(code => state.byCode[code]);

export const getLanguage = (state, code) => 
  state.byCode[code];

export const getLanguagesFromCodes = (state, codes) => {
  return getAllLanguages(state).filter(lang => codes.indexOf(lang.code) > -1);
}