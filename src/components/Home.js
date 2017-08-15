import React from 'react';
import AuthContainer from './AuthContainer';
import SurveyListContainer from 'containers/SurveyListContainer';

function Home(props) {
  return (
    <SurveyListContainer /> //wrap in auth container
  );
}

export default Home;