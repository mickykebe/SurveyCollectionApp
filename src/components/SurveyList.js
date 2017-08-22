import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import SurveyCardContainer from 'containers/SurveyCardContainer';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';

const styles = (theme) => ({
  header: {
    display: 'flex',
    marginBottom: '20px',
    alignItems: 'center',
  },
  headerText: {
    flex: '1',

  },
  card: {
    marginBottom: '20px'
  },
  addButton: {
    width: '50px',
    height: '50px',
  },
});

class SurveyList extends Component {
  render() {
    const { classes, surveys, history } = this.props;
    
    return (
      <div>
        <div className={classes.header}>
          <Typography type="headline" className={classes.headerText}>
            My Surveys
          </Typography>
          <Button fab color="accent" onClick={() => history.push('/surveys/new')} className={classes.addButton}>
            <AddIcon />
          </Button>
        </div>
        {
          surveys.map(({id, ...rest}) => 
            <SurveyCardContainer key={id} {...rest} className={classes.card} />)
        }
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(SurveyList));