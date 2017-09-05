import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import CreateIcon from 'material-ui-icons/Create';
import { valFromLangObj } from 'utils';

const styles = (theme) => ({
  root: {
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '8px',
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
  const { id, title, description, languages, classes, history } = props;
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography type="title">
          {valFromLangObj(title)}
        </Typography>
        <Typography component="subheading">
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
      <CardActions>
        <IconButton onClick={() => history.push(`/surveys/edit/${id}`)}>
          <CreateIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

SurveyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  description: PropTypes.object,
  languages: PropTypes.array
}

export default withRouter(withStyles(styles)(SurveyCard));