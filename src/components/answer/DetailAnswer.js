import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SurveyHeader from './SurveyHeader';
import QuestionAnswer from './QuestionAnswer';
import { fetchSurvey, surveyAnswers } from './mockData';
import {valFromLangObj} from '../../utils';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};
  
function DetailAnswer(props){
  return (
      <div>
        <SurveyHeader title={valFromLangObj(fetchSurvey().title)} /><br/> 
        <QuestionAnswer question={surveyAnswers.question} answer={surveyAnswers.question} />
      </div>
  )
}
  
DetailAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DetailAnswer);