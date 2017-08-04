import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SurveyCard from './SurveyCard';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import Typography from 'material-ui/Typography';
import { REDIRECT_TO } from '../actionTypes';

const stylesheet = createStyleSheet((theme) => ({
  header: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.common.minBlack}`,
    marginBottom: '20px',
  },
  headerText: {
    flex: '1',
  },
  card: {
    marginBottom: '20px'
  },
}));

const mapStateToProps = (state) => ({
  //surveys: state.SurveyList.surveys
  surveys: [{
    id: 1,
    title: 'Book Survey',
    description: 'Take a survey on books'
  },
  {
    id: 2,
    title: 'Economics Survey'
  }]
});

const mapDispatchToProps = (dispatch) => ({
  redirectToNewSurvey: () => 
    dispatch({ type: REDIRECT_TO, path: '/surveys/new' })
});

class SurveyList extends Component {
  render() {
    const { classes, surveys, redirectToNewSurvey } = this.props;
    return (
      <div>
        <div className={classes.header}>
          <Typography type="headline" className={classes.headerText}>
            My Surveys
          </Typography>
          <IconButton color="accent" onClick={redirectToNewSurvey}>
            <AddCircleIcon />
          </IconButton>
        </div>
        {
          surveys.map(({id, title, description}) => 
            <SurveyCard key={id} title={title} description={description} className={classes.card} />)
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(stylesheet)(SurveyList));