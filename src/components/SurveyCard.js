import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const stylesheet = createStyleSheet((theme) => ({
  content: {
    minHeight: '60px',
  }
}));

function SurveyCard(props) {
  const { title, description, classes, className } = props;
  const rootClass = classnames(className);
  return (
    <Card className={rootClass}>
      <CardContent className={classes.content}>
        <Typography type="title">
          {title}
        </Typography>
        <Typography component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

SurveyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default withStyles(stylesheet)(SurveyCard);