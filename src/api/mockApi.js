const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fakeDb = {
  surveys: [{
    id: 1,
      title: 'Book Survey',
      description: 'Take a survey on books',
      languages: ["1"]
    },
    {
      id: 2,
      title: 'Economics Survey',
      languages: ["1", "2"]
    }],
}

export const fetchMySurveys = (userId) => 
  delay(500).then(() => {
    return fakeDb.surveys;
  });

export const addSurvey = (survey) =>
  delay(500).then(() => {
    fakeDb.surveys.push(survey);
    return survey;
  });