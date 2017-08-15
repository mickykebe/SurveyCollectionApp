const surveys = {
  byId: {
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
  },
  allIds: [1, 2],
};

const languages = {
  byId:{
    "1": {
      id: 1,
      code: "en",
      name: "English"
    },
    "2": {
      id: 2,
      code: "am",
      name: "Amharic"
    },
    "3": {
      id: 3,
      code: "Or",
      name: "Oromiffa"
    }
  },
  allIds: [1, 2, 3],
};

const questionTypes = {
  byId: {
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
    },
    "6": {
      id: 6,
      type: 'location',
      name: 'Location'
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
  },
  allIds: [1, 2, 3, 4, 5, 6, 7, 8],
};

export default { surveys, languages, questionTypes };