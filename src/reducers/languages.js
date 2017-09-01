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
    },
    "tr": {
      code: "Tr",
      name: "Tigrigna"
    }
  },
  allCodes: ["en", "am", "or", "tr"],
};

const languages = (state = defaultState, action) => {
  return state;
}

export default languages;

export const getAllLanguages = (state) =>
  state.allCodes.map(code => state.byCode[code]);

export const getLanguage = (state, code) => 
  state.byCode[code.toLowerCase()];

export const getLanguagesFromCodes = (state, codes) => {
  return getAllLanguages(state).filter(lang => codes.indexOf(lang.code) > -1);
}