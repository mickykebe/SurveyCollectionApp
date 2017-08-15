import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SurveyCardContainer from 'containers/SurveyCardContainer';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import Typography from 'material-ui/Typography';

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
          surveys.map(({id, ...rest}) => 
            <SurveyCardContainer key={id} {...rest} className={classes.card} />)
        }
      </div>
    )
  }
}

export default withStyles(stylesheet)(SurveyList);