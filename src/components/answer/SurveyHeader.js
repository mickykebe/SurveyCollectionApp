import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';



const styles = {
  card: {
    maxWidth: '100%'
  },
};

function SurveyHeader(props){

  const {classes} = props;
  const title = props.title;
  return (
      <div>
        <Card className={classes.card} raised={false}>
          <CardContent>
            <Typography type="headline" component="h1" color="secondary" align="center">
              {title}
            </Typography>
          </CardContent>
        </Card>
      </div>
  )
 
}

SurveyHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SurveyHeader);