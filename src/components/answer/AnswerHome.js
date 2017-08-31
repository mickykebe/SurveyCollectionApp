import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { fetchSurvey, surveyAnswers } from './mockData';
import SurveyHeader from './SurveyHeader';
import SurveyAnswerList from './SurveyAnswerList';
import {valFromLangObj} from '../../utils';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

function AnswerHome(props){

  const {classes} = props.classes;
  
  return (
      <div>
        <SurveyHeader title={valFromLangObj(fetchSurvey().title)} /><br/> 
        <SurveyAnswerList uuid={surveyAnswers.uuid} onResponseClick={props.onResponseClick} />
      </div>
  )
 
}

AnswerHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnswerHome);