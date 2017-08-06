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

export default { surveys, languages };