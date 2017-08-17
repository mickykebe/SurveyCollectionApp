const types = {
  "1": {
    id: 1,
    type: "text",
    name: "Text",
    validOperators: ["==", "!="]
  },
  "2": {
    id: 2,
    type: "number",
    name: "Number",
    validOperators: ["==", "!=", "<", ">", "<=", ">="]
  },
  "3": {
    id: 3,
    type: "number-range",
    name: "Number Range",
    validOperators: ["==", "!=", "<", ">", "<=", ">="]
  },
  "4": {
    id: 4,
    type: "choose-one",
    name: "Choose One",
    validOperators: ["==", "!="]
  },
  "5": {
    id: 5,
    type: "choose-any",
    name: "Choose Many",
    validOperators: ["==", "!="]
  },
  "6": {
    id: 6,
    type: 'location',
    name: 'Location',
  },
  "7": {
    id: 7,
    type: 'currency',
    name: 'Currency',
  },
  "8": {
    id: 8,
    type: 'image',
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