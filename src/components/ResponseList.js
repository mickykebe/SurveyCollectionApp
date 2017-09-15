import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { valFromLangObj } from 'utils';
import SurveyHeaderContainer from '../containers/SurveyHeaderContainer';

const styles = theme => ({

});

function ResponseList({ id, responses, fetchingResponses, responsesFetchError }) {
  return (
    <div>
      <SurveyHeaderContainer id={id} />
    </div>
  )
}

export default withStyles(styles)(ResponseList);