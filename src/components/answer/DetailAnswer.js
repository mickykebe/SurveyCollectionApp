import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
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
  
    const {classes} = props.classes;
  
    
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