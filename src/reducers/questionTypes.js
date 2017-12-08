const types = {
  "text": {
    id: "text",
    name: "Text",
    validOperators: ["==", "!="]
  },
  "number": {
    id: "number",
    name: "Number",
    validOperators: ["==", "!=", "<", ">", "<=", ">="]
  },
  "number-range": {
    id: "number-range",
    name: "Number Range",
    validOperators: ["==", "!=", "<", ">", "<=", ">="]
  },
  "date": {
    id: "date",
    name: "Date",
    validOperators: ["==", "!="],
  },
  "choose-one": {
    id: "choose-one",
    name: "Choose One",
    validOperators: ["==", "!="]
  },
  "choose-any": {
    id: "choose-any",
    name: "Choose Many",
    validOperators: ["one-of"]
  },
  "location": {
    id: 'location',
    name: 'Location',
  },
  "currency": {
    id: 'currency',
    name: 'Currency',
    validOperators: ["==", "!="]
  },
  "image": {
    id: 'image',
    name: 'Image',
  },
}

const questionTypes = (state, action) => {
  return types;
};

export default questionTypes;

export const getAllQuestionTypes = (state) => 
  Object.keys(state).map(id => state[id]);
export const getQuestionTypeOperators = (state, id) =>
  state[id].validOperators || [];