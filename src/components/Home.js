import React from 'react';
import Content from './Content';
import SurveyTableContainer from '../containers/SurveyTableContainer';

function Home(props) {
  return (
    <Content>
      <SurveyTableContainer />
    </Content>
  );
}

export default Home;