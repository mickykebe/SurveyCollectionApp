import React from 'react';
import AuthContainer from './AuthContainer';
import SurveyList from './SurveyList';

function Home(props) {
  return (
    <AuthContainer>
      <SurveyList />
    </AuthContainer>
  );
}

export default Home;