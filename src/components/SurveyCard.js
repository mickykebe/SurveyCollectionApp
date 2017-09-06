import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import CreateIcon from 'material-ui-icons/Create';
import DeleteIcon from 'material-ui-icons/Delete';
import PopupSnackbar from './PopupSnackbar';
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
  },
  flexGrow: {
    flex: 1,
  }
});

class SurveyCard extends Component {
  constructor(props) {
    super(props);

    this.state = { deleteDialogOpen: false };
    this.deleteSurvey = this.deleteSurvey.bind(this);
    this.deleteDialogClose = this.deleteDialogClose.bind(this);
  }

  deleteSurvey() {
    const { id, onDeleteSurvey } = this.props;
    onDeleteSurvey(id);
    this.deleteDialogClose();
  }

  deleteDialogClose() {
    this.setState({
      deleteDialogOpen: false,
    });
  }

  render() {
    const { id, title, description, languages, classes, history, errors, onDeleteSurvey, isDeletingSurvey } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography type="headline">
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
        <CardActions>
          <div className={classes.flexGrow} />
          <IconButton onClick={() => history.push(`/surveys/edit/${id}`)}>
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => this.setState({ deleteDialogOpen: true })}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <Dialog open={this.state.deleteDialogOpen} onRequestClose={this.deleteDialogClose}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this survey?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteSurvey}>
              Yes
            </Button>
            <Button onClick={this.deleteDialogClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <PopupSnackbar
          show={!!errors && !isDeletingSurvey}
          message="Problem occurred deleting survey"
          retryAction={this.deleteSurvey} />
      </Card>
    );
  }
}

SurveyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  description: PropTypes.object,
  languages: PropTypes.array
}

export default withRouter(withStyles(styles)(SurveyCard));