import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import { valFromLangObj } from 'utils';

const styles = (theme) => ({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '8px'
  },
  chip: {
    margin: theme.spacing.unit,
    height: '20px'
  },
  avatar: {
    width: '28px',
    height: '28px'
  }
});

function SurveyCard(props) {
  const { title, description, languages, classes, className } = props;
  const rootClass = classnames(className);
  return (
    <Card className={rootClass}>
      <CardContent className={classes.content}>
        <Typography type="title">
          {valFromLangObj(title)}
        </Typography>
        <Typography component="p">
          {valFromLangObj(description)}
        </Typography>
      </CardContent>
      <div className={classes.row}>
        { 
          languages.map((lang) => 
            <Chip
              key={lang.code}
              label={lang.name}
              className={classes.chip} />)
        }
      </div>
    </Card>
  );
}

SurveyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  description: PropTypes.object,
  languages: PropTypes.array
}

export default withStyles(styles)(SurveyCard);