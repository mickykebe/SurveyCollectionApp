const surveys = {
  "1": {
    id: 1,
    title: 'Book Survey',
    description: 'Take a survey on books',
    languages: ["1"]
  },
  "2": {
    id: 2,
    title: 'Economics Survey',
    languages: ["1", "2"]
  }
};

const languages = {
  "1": {
    id: 1,
    key: "en",
    name: "English"
  },
  "2": {
    id: 2,
    key: "am",
    name: "Amharic"
  },
  "3": {
    id: 3,
    key: "Or",
    name: "Oromiffa"
  }
}

const questionTypes = {
  "1": {
    id: 1,
    type: "text",
    name: "Text"
  },
  "2": {
    id: 2,
    type: "number",
    name: "Number"
  },
  "3": {
    id: 3,
    type: "number-range",
    name: "Number Range",
  },
  "4": {
    id: 4,
    type: "choose-one",
    name: "Choose One",
  },
  "5": {
    id: 5,
    type: "choose-any",
    name: "Choose Many"
  }
}

export default { surveys, languages, questionTypes };