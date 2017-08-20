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

export default { surveys, languages };
