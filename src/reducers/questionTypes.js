const types = {
  text: {
    id: "text",
    name: "Text",
    validOperators: ["==", "!="],
    tableDisplay: true
  },
  number: {
    id: "number",
    name: "Number",
    validOperators: ["==", "!=", "<", ">", "<=", ">="],
    tableDisplay: true
  },
  "number-range": {
    id: "number-range",
    name: "Number Range",
    validOperators: ["==", "!=", "<", ">", "<=", ">="],
    tableDisplay: true
  },
  date: {
    id: "date",
    name: "Date",
    validOperators: ["==", "!="],
    tableDisplay: true
  },
  "choose-one": {
    id: "choose-one",
    name: "Choose One",
    validOperators: ["==", "!="],
    tableDisplay: true
  },
  "choose-any": {
    id: "choose-any",
    name: "Choose Many",
    validOperators: ["one-of"],
    tableDisplay: true
  },
  location: {
    id: "location",
    name: "Location",
    tableDisplay: false
  },
  currency: {
    id: "currency",
    name: "Currency",
    validOperators: ["==", "!="],
    tableDisplay: true
  },
  image: {
    id: "image",
    name: "Image",
    tableDisplay: false
  }
};

const questionTypes = (state, action) => {
  return types;
};

export default questionTypes;

export const getAllQuestionTypes = state =>
  Object.keys(state).map(id => state[id]);
export const getQuestionTypeOperators = (state, id) =>
  state[id].validOperators || [];
export const getQuestionType = (state, id) => state[id];
