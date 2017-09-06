import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import SurveyCardContainer from 'containers/SurveyCardContainer';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';

const styles = (theme) => ({
  root: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    marginBottom: '20px',
    alignItems: 'center',
  },
  headerText: {
    flex: '1',

  },
  addButton: {
    width: '50px',
    height: '50px',
  },
});

class SurveyList extends Component {
  render() {
    const { classes, surveys, errors, history } = this.props;
    
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography type="headline" className={classes.headerText}>
            My Surveys
          </Typography>
          <Button fab color="accent" onClick={() => history.push('/surveys/new')} className={classes.addButton}>
            <AddIcon />
          </Button>
        </div>
        {
          !surveys.length &&
          <Typography type="subheading">
            Surveys unavailable
          </Typography>
        }
        {
          surveys.map(({uuid: id, ...rest}) => 
            <SurveyCardContainer key={id} id={id} {...rest} />)
        }
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(SurveyList));